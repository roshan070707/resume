import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from '../context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

const INITIAL_RESUME_DATA = {
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

export function useResumes() {
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResumes = async () => {
    if (!user) {
      setResumes([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setResumes(data || []);
    } catch (e) {
      console.error('Error fetching resumes:', e);
      toast.error('Failed to load resumes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, [user]);

  const createResume = async (title = 'My Resume', template = 'modern_tech') => {
    if (!user) return null;
    try {
      const initialData = { ...INITIAL_RESUME_DATA, template };
      const { data, error } = await supabase
        .from('resumes')
        .insert([{
          user_id: user.id,
          title,
          resume_data: initialData,
          template,
          ats_score: 0,
        }])
        .select()
        .single();

      if (error) throw error;
      setResumes(prev => [data, ...prev]);
      toast.success('Resume created!');
      return data;
    } catch (e) {
      console.error('Error creating resume:', e);
      toast.error('Failed to create resume.');
      return null;
    }
  };

  const getResume = async (id) => {
    if (!user) return null;
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data;
    } catch (e) {
      console.error('Error getting resume:', e);
      return null;
    }
  };

  const updateResume = async (id, resumeData, template, atsScore, title) => {
    if (!user) return false;
    try {
      const updates = {
        resume_data: resumeData,
        template: template || resumeData.template || 'modern_tech',
        ats_score: atsScore !== undefined ? atsScore : 0,
        updated_at: new Date().toISOString(),
      };
      if (title !== undefined) updates.title = title;

      const { error } = await supabase
        .from('resumes')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      setResumes(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
      return true;
    } catch (e) {
      console.error('Error updating resume:', e);
      return false;
    }
  };

  const deleteResume = async (id) => {
    if (!user) return false;
    try {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      setResumes(prev => prev.filter(r => r.id !== id));
      toast.success('Resume deleted.');
      return true;
    } catch (e) {
      console.error('Error deleting resume:', e);
      toast.error('Failed to delete resume.');
      return false;
    }
  };

  const duplicateResume = async (id) => {
    if (!user) return null;
    try {
      const original = await getResume(id);
      if (!original) throw new Error('Original resume not found.');

      const { data, error } = await supabase
        .from('resumes')
        .insert([{
          user_id: user.id,
          title: `${original.title} (Copy)`,
          resume_data: original.resume_data,
          template: original.template,
          ats_score: original.ats_score,
        }])
        .select()
        .single();

      if (error) throw error;
      setResumes(prev => [data, ...prev]);
      toast.success('Resume duplicated!');
      return data;
    } catch (e) {
      console.error('Error duplicating resume:', e);
      toast.error('Failed to duplicate resume.');
      return null;
    }
  };

  return {
    resumes,
    loading,
    createResume,
    getResume,
    updateResume,
    deleteResume,
    duplicateResume,
    fetchResumes,
  };
}
