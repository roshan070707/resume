import { useState, useEffect, useRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useResumes } from './useResumes';
import { calculateAtsScore } from '../utils/scoring';

const INITIAL_STATE = {
  personal: {
    firstName: '',
    lastName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
    summary: '',
  },
  experience: [],
  education: [],
  projects: [],
  certifications: [],
  skills: [],
  template: 'modern_tech',
};

export function useResumeData(resumeId) {
  const { getResume, updateResume } = useResumes();

  const [data, setData] = useState(INITIAL_STATE);
  const [title, setTitle] = useState('My Resume');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null); // Date object

  // Refs so async callbacks always see the latest values without stale closures
  const latestDataRef = useRef(data);
  const latestTitleRef = useRef(title);
  const saveTimeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const isLoadedRef = useRef(false);

  // Keep refs in sync with state
  useEffect(() => { latestDataRef.current = data; }, [data]);
  useEffect(() => { latestTitleRef.current = title; }, [title]);

  // ── Load resume from Supabase on mount ─────────────────────────────────────
  useEffect(() => {
    isLoadedRef.current = false;
    setLoading(true);

    let active = true;
    const load = async () => {
      if (!resumeId) return;
      const res = await getResume(resumeId);
      if (res && active) {
        const rData = res.resume_data || {};
        const merged = {
          ...INITIAL_STATE,
          ...rData,
          personal: { ...INITIAL_STATE.personal, ...(rData.personal || {}) },
          experience:     rData.experience     || [],
          education:      rData.education      || [],
          projects:       rData.projects       || [],
          certifications: rData.certifications || [],
          skills:         rData.skills         || [],
          template: res.template || rData.template || 'modern_tech',
        };
        setData(merged);
        setTitle(res.title || 'My Resume');
        // Restore last-saved timestamp from the DB record
        if (res.updated_at) setLastSaved(new Date(res.updated_at));
        isLoadedRef.current = true;
      }
      if (active) setLoading(false);
    };

    load();
    return () => {
      active = false;
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [resumeId]);

  // ── 30-second interval autosave ─────────────────────────────────────────────
  useEffect(() => {
    if (!resumeId) return;
    intervalRef.current = setInterval(() => {
      if (!isLoadedRef.current) return;
      // Only run if the debounce queue is idle (no pending save)
      if (!saveTimeoutRef.current) {
        performSave(latestDataRef.current, latestTitleRef.current);
      }
    }, 30000);
    return () => clearInterval(intervalRef.current);
  }, [resumeId]);

  // ── Core save function ──────────────────────────────────────────────────────
  const performSave = useCallback(async (dataToSave, titleToSave) => {
    if (!resumeId || !isLoadedRef.current) return false;
    setSaving(true);
    try {
      const { score: atsScore } = calculateAtsScore(dataToSave);
      const template = dataToSave.template || 'modern_tech';
      const success = await updateResume(resumeId, dataToSave, template, atsScore, titleToSave);
      if (success) setLastSaved(new Date());
      return success;
    } finally {
      setSaving(false);
    }
  }, [resumeId, updateResume]);

  // ── Debounced autosave triggered on every field change (1 s debounce) ───────
  const triggerAutoSave = useCallback((updatedData, updatedTitle) => {
    if (!resumeId || !isLoadedRef.current) return;
    setSaving(true);
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    const titleForSave = updatedTitle ?? latestTitleRef.current;
    saveTimeoutRef.current = setTimeout(async () => {
      saveTimeoutRef.current = null;
      await performSave(updatedData, titleForSave);
    }, 1000);
  }, [performSave, resumeId]);

  // ── Explicit save (Save button) ─────────────────────────────────────────────
  const forceSave = useCallback(async () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
    }
    return performSave(latestDataRef.current, latestTitleRef.current);
  }, [performSave]);

  // ── Field updaters ──────────────────────────────────────────────────────────
  const updateTitle = (newTitle) => {
    setTitle(newTitle);
    latestTitleRef.current = newTitle;
    triggerAutoSave(latestDataRef.current, newTitle);
  };

  const updatePersonal = (field, value) => {
    setData(prev => {
      const next = { ...prev, personal: { ...prev.personal, [field]: value } };
      triggerAutoSave(next);
      return next;
    });
  };

  const updateTemplate = (templateId) => {
    setData(prev => {
      const next = { ...prev, template: templateId };
      triggerAutoSave(next);
      return next;
    });
  };

  const addListItem = (listName, emptyItem) => {
    setData(prev => {
      const next = { ...prev, [listName]: [...prev[listName], { id: uuidv4(), ...emptyItem }] };
      triggerAutoSave(next);
      return next;
    });
  };

  const updateListItem = (listName, id, field, value) => {
    setData(prev => {
      const next = {
        ...prev,
        [listName]: prev[listName].map(item => item.id === id ? { ...item, [field]: value } : item),
      };
      triggerAutoSave(next);
      return next;
    });
  };

  const removeListItem = (listName, id) => {
    setData(prev => {
      const next = { ...prev, [listName]: prev[listName].filter(item => item.id !== id) };
      triggerAutoSave(next);
      return next;
    });
  };

  const moveItemUp = (listName, index) => {
    if (index === 0) return;
    setData(prev => {
      const list = [...prev[listName]];
      [list[index - 1], list[index]] = [list[index], list[index - 1]];
      const next = { ...prev, [listName]: list };
      triggerAutoSave(next);
      return next;
    });
  };

  const moveItemDown = (listName, index) => {
    setData(prev => {
      const list = [...prev[listName]];
      if (index === list.length - 1) return prev;
      [list[index + 1], list[index]] = [list[index], list[index + 1]];
      const next = { ...prev, [listName]: list };
      triggerAutoSave(next);
      return next;
    });
  };

  const addSkill = (skill) => {
    if (!skill) return;
    setData(prev => {
      if (prev.skills.includes(skill)) return prev;
      const next = { ...prev, skills: [...prev.skills, skill] };
      triggerAutoSave(next);
      return next;
    });
  };

  const removeSkill = (skillToRemove) => {
    setData(prev => {
      const next = { ...prev, skills: prev.skills.filter(s => s !== skillToRemove) };
      triggerAutoSave(next);
      return next;
    });
  };

  return {
    data,
    title,
    loading,
    saving,
    lastSaved,
    updateTitle,
    updatePersonal,
    updateTemplate,
    addListItem,
    updateListItem,
    removeListItem,
    moveItemUp,
    moveItemDown,
    addSkill,
    removeSkill,
    forceSave,
  };
}
