import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, CheckCircle2, AlertTriangle, Lightbulb, Search, Activity, Target } from 'lucide-react';
import { analyzeResumeLocal } from '../../utils/atsEngine';
import toast from 'react-hot-toast';

const ATSOptimizer = ({ data, addSkill }) => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      const result = analyzeResumeLocal(data);
      if (result) {
        setAnalysis(result);
        toast.success("Resume analyzed successfully!");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div style={{
      background: 'var(--bg-surface-elevated)',
      border: '1px solid var(--glass-border)',
      borderRadius: '16px',
      padding: '1.5rem',
      color: 'var(--text-primary)',
      boxShadow: 'var(--shadow-md)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative gradient blur */}
      <div style={{
        position: 'absolute', bottom: '-50px', left: '-50px', width: '150px', height: '150px',
        background: 'rgba(16, 185, 129, 0.1)', filter: 'blur(50px)', borderRadius: '50%', zIndex: 0
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Target size={20} style={{ color: 'var(--color-success)' }} /> ATS Insights
        </h3>
        <button
          onClick={handleAnalyze}
          disabled={loading}
          style={{
            background: 'var(--color-success)',
            border: 'none',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '100px',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            opacity: loading ? 0.7 : 1,
            transition: 'all var(--transition-fast)',
            boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.39)'
          }}
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Activity size={14} />}
          {loading ? 'Analyzing...' : 'Run Scan'}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {analysis && !loading ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', zIndex: 1 }}
          >
            {/* Score Ring (Mock visual representation) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-surface)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
              <div style={{ 
                width: '60px', height: '60px', borderRadius: '50%', background: `conic-gradient(${analysis.score >= 80 ? 'var(--color-success)' : analysis.score >= 60 ? 'var(--color-warning)' : 'var(--color-danger)'} ${analysis.score}%, var(--glass-border) 0)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
              }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.2rem', color: analysis.score >= 80 ? 'var(--color-success)' : analysis.score >= 60 ? 'var(--color-warning)' : 'var(--color-danger)' }}>
                  {analysis.score}
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>Great Match</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: '0.25rem' }}>
                  {analysis.scoreExplanation || 'Based on general ATS criteria'}
                </div>
              </div>
            </div>

            {/* Strengths */}
            {analysis.strengths && analysis.strengths.length > 0 && (
              <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-heading)' }}>
                  <CheckCircle2 size={16} /> Strengths
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {analysis.strengths.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            )}

            {/* Weaknesses */}
            {analysis.weaknesses && analysis.weaknesses.length > 0 && (
              <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: 'var(--color-danger)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-heading)' }}>
                  <AlertTriangle size={16} /> Needs Improvement
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {analysis.weaknesses.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            )}

            {/* Missing Keywords */}
            {analysis.missingKeywords && analysis.missingKeywords.length > 0 && (
              <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: 'var(--color-warning)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-heading)' }}>
                  <Search size={16} /> Missing Keywords
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {analysis.missingKeywords.map((item, i) => {
                    const isAdded = data.skills.some(s => s.toLowerCase() === item.toLowerCase());
                    return (
                      <button 
                        key={i} 
                        onClick={() => {
                          if (!isAdded && addSkill) {
                            addSkill(item);
                            toast.success(`Added "${item}" to skills`);
                          }
                        }}
                        disabled={isAdded}
                        style={{
                          background: isAdded ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', 
                          color: isAdded ? 'var(--color-success)' : 'var(--color-warning)', 
                          border: isAdded ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(245, 158, 11, 0.2)', 
                          padding: '0.25rem 0.6rem', 
                          borderRadius: '6px', 
                          fontSize: '0.8rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          cursor: isAdded ? 'default' : 'pointer',
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        <span>{item}</span>
                        {!isAdded && <span style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>+ Add</span>}
                        {isAdded && <span style={{ fontSize: '0.75rem' }}>✓ Added</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ATS Improvements */}
            {analysis.atsImprovements && analysis.atsImprovements.length > 0 && (
              <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-heading)' }}>
                  <Lightbulb size={16} /> Recommended Actions
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {analysis.atsImprovements.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            )}

            {/* Recommended Skills */}
            {analysis.recommendedSkills && analysis.recommendedSkills.length > 0 && (
              <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-heading)' }}>
                  <Sparkles size={16} style={{ color: 'var(--color-primary)' }} /> Skills to Add
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {analysis.recommendedSkills.map((item, i) => {
                    const isAdded = data.skills.some(s => s.toLowerCase() === item.toLowerCase());
                    return (
                      <button 
                        key={i} 
                        onClick={() => {
                          if (!isAdded && addSkill) {
                            addSkill(item);
                            toast.success(`Added "${item}" to skills`);
                          }
                        }}
                        disabled={isAdded}
                        style={{
                          background: isAdded ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-surface-elevated)', 
                          color: isAdded ? 'var(--color-success)' : 'var(--text-primary)', 
                          border: isAdded ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid var(--glass-border)', 
                          padding: '0.25rem 0.6rem', 
                          borderRadius: '6px', 
                          fontSize: '0.8rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          cursor: isAdded ? 'default' : 'pointer',
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        <span>{item}</span>
                        {!isAdded && <span style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>+ Add</span>}
                        {isAdded && <span style={{ fontSize: '0.75rem' }}>✓ Added</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        ) : !loading ? (
          <motion.div 
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem 1rem', lineHeight: 1.6, position: 'relative', zIndex: 1 }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px dashed var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', color: 'var(--text-tertiary)' }}>
              <Search size={24} />
            </div>
            Run an ATS scan to identify missing keywords, formatting issues, and overall resume strength against modern tracking systems.
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default ATSOptimizer;
