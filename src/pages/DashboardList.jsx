import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, Search, FileText, MoreVertical, Edit2, Copy, 
  Trash2, LogOut, ShieldCheck, Clock, Target
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useResumes } from '../hooks/useResumes';
import styles from './DashboardList.module.css';

const DashboardList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { resumes, loading, createResume, deleteResume, duplicateResume } = useResumes();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Auto-create resume if navigated from template gallery with a template selection
  useEffect(() => {
    if (location.state?.template && !loading) {
      const selectedTemplate = location.state.template;
      
      // Make sure we don't double-create if user is already redirected
      const createAuto = async () => {
        const title = `My ${getTemplateLabel(selectedTemplate)} Resume`;
        const newResume = await createResume(title, selectedTemplate);
        if (newResume && !newResume.error) {
          // Clear history state to avoid double triggers
          window.history.replaceState({}, document.title);
          navigate(`/builder/${newResume.id}`);
        }
      };
      createAuto();
    }
  }, [location.state, loading]);

  const handleCreate = async () => {
    const defaultTitle = `Resume #${resumes.length + 1}`;
    const newResume = await createResume(defaultTitle, 'modern_tech');
    if (newResume && !newResume.error) {
      navigate(`/builder/${newResume.id}`);
    }
  };

  const handleEdit = (id) => {
    navigate(`/builder/${id}`);
  };

  const handleDuplicate = async (e, id) => {
    e.stopPropagation();
    setActiveDropdown(null);
    await duplicateResume(id);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    setActiveDropdown(null);
    if (window.confirm("Are you sure you want to delete this resume?")) {
      await deleteResume(id);
    }
  };

  const toggleDropdown = (e, id) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  // Close dropdown on click outside
  React.useEffect(() => {
    const closeAll = () => setActiveDropdown(null);
    window.addEventListener('click', closeAll);
    return () => window.removeEventListener('click', closeAll);
  }, []);

  const formatRelativeTime = (isoString) => {
    if (!isoString) return 'Just now';
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  const getTemplateLabel = (templateId) => {
    const labels = {
      modern_tech: 'Modern Tech',
      corporate: 'Corporate',
      student_fresher: 'Student / Fresher',
      executive: 'Executive',
      creative: 'Creative Visual',
      fresher: 'Student / Fresher',
      developer: 'Developer',
      frontend: 'Frontend Developer'
    };
    return labels[templateId] || templateId || 'Modern Tech';
  };

  const filteredResumes = resumes.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.dashboardContainer}>
      {/* Top Navigation */}
      <header className={styles.topBar}>
        <div className={styles.brand} onClick={() => navigate('/')}>
          <ShieldCheck className={styles.brandIcon} size={24} />
          <span>Resume<span className={styles.brandHighlight}>Studio</span></span>
        </div>

        <div className={styles.userMenu}>

          {user?.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name} 
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '1px solid var(--glass-border)',
                marginRight: '0.25rem'
              }}
            />
          ) : (
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: '0.85rem',
              border: '1px solid var(--glass-border)',
              marginRight: '0.25rem'
            }}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}

          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.name || user?.email?.split('@')[0] || 'User'}</span>
            <span className={styles.userEmail}>{user?.email}</span>
          </div>

          <button className={styles.logoutBtn} onClick={signOut}>
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Main SaaS panel */}
      <main className={styles.mainContent}>
        <div className={styles.welcomeSection}>
          <div className={styles.titleArea}>
            <h1>My Resumes</h1>
            <p>Select, create, or optimize your professional resumes with our premium design tools.</p>
          </div>
          <button className={styles.createBtn} onClick={handleCreate}>
            <Plus size={18} /> Create Resume
          </button>
        </div>

        {/* Stats Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Resumes</span>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>{resumes.length}</span>
          </div>
          <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Avg. ATS Match</span>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>
              {resumes.length ? Math.round(resumes.reduce((acc, r) => acc + (r.ats_score || 0), 0) / resumes.length) : 0}%
            </span>
          </div>
          <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Last Updated</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 'auto' }}>
              {resumes.length > 0 ? formatRelativeTime(resumes[0].updated_at) : 'Never'}
            </span>
          </div>
        </div>

        {resumes.length > 0 && (
          <div className={styles.toolbar}>
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} size={16} />
              <input 
                type="text" 
                placeholder="Search resumes..." 
                className={styles.searchInput}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}

        {loading ? (
          // Skeleton Loader
          <div className={styles.resumesGrid}>
            {[1, 2, 3].map(i => (
              <div key={i} className={styles.skeletonCard}>
                <div>
                  <div className={styles.skeletonTitle} />
                  <div className={styles.skeletonMeta} />
                </div>
                <div className={styles.skeletonFooter}>
                  <div className={styles.skeletonBadge} />
                  <div className={styles.skeletonBadge} style={{ width: '40px' }} />
                </div>
              </div>
            ))}
          </div>
        ) : filteredResumes.length > 0 ? (
          // Resumes Grid
          <div className={styles.resumesGrid}>
            {filteredResumes.map(resume => (
              <motion.div 
                key={resume.id}
                className={styles.resumeCard}
                onClick={() => handleEdit(resume.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.cardInfo}>
                    <h3 className={styles.cardTitle}>{resume.title}</h3>
                    <div className={styles.cardMeta} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={12} /> Updated {formatRelativeTime(resume.updated_at)}
                    </div>
                  </div>
                  
                  {/* Actions Dropdown */}
                  <div className={styles.actionMenuWrapper}>
                    <button 
                      className={styles.actionMenuBtn} 
                      onClick={(e) => toggleDropdown(e, resume.id)}
                    >
                      <MoreVertical size={16} />
                    </button>
                    {activeDropdown === resume.id && (
                      <div className={styles.dropdownMenu}>
                        <button className={styles.dropdownItem} onClick={() => handleEdit(resume.id)}>
                          <Edit2 size={14} /> Edit
                        </button>
                        <button className={styles.dropdownItem} onClick={(e) => handleDuplicate(e, resume.id)}>
                          <Copy size={14} /> Duplicate
                        </button>
                        <hr style={{ border: 'none', height: '1px', background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />
                        <button className={`${styles.dropdownItem} ${styles.deleteItem}`} onClick={(e) => handleDelete(e, resume.id)}>
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.templateBadge}>
                    {getTemplateLabel(resume.template)}
                  </span>
                  
                  {/* ATS Score Badge */}
                  <span className={`${styles.atsBadge} ${
                    resume.ats_score >= 80 ? styles.atsGreen : 
                    resume.ats_score >= 50 ? styles.atsOrange : styles.atsRed
                  }`}>
                    <Target size={12} /> ATS: {resume.ats_score || 0}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // Empty State
          <motion.div 
            className={styles.emptyState}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.emptyIcon}>
              <FileText size={48} strokeWidth={1} />
            </div>
            <h3>No Resumes Found</h3>
            <p>
              {searchQuery 
                ? "No resumes match your search query." 
                : "Create your first professional resume with real-time formatting and ATS optimization."}
            </p>
            <button className={styles.createBtn} onClick={handleCreate}>
              <Plus size={18} /> Create Resume
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default DashboardList;
