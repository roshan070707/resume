import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import toast, { Toaster } from 'react-hot-toast';
import { 
  Download, Save, ChevronLeft, LayoutTemplate, 
  ZoomIn, ZoomOut, Maximize, Search, Wand2, ShieldCheck,
  Menu, X, User, Briefcase, GraduationCap, FolderGit2, Award, Wrench, Target, Eye, Edit3
} from 'lucide-react';
import { useResumeData } from '../hooks/useResumeData';
import { useAuth } from '../context/AuthContext';
import { useIsMobile } from '../hooks/useIsMobile';
import { calculateAtsScore, calculateCompletion } from '../utils/scoring';
import { PersonalInfoForm, ExperienceForm, EducationForm, ProjectsForm, CertificationsForm, SkillsForm } from '../components/builder/Forms';
import LivePreview from '../components/templates/LivePreview';
import ATSOptimizer from '../components/builder/ATSOptimizer';


import styles from './Dashboard.module.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const isPremiumUser = user?.plan === 'premium';
  const isMobile = useIsMobile();
  const [mobileMode, setMobileMode] = useState('edit'); // 'edit' or 'preview'
  const [activeTab, setActiveTab] = useState('Personal');
  const [zoomLevel, setZoomLevel] = useState(0.85);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const previewRef = useRef(null);
  
  const {
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
    forceSave
  } = useResumeData(id);

  // ── Live relative-time display (updates every 30 s) ──────────────────────
  const getRelativeTime = (date) => {
    if (!date) return null;
    const diffMs = Date.now() - new Date(date).getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    if (diffSecs < 10) return 'just now';
    if (diffSecs < 60) return `${diffSecs}s ago`;
    if (diffMins < 60) return `${diffMins}m ago`;
    return `${diffHours}h ago`;
  };

  const [saveTimeAgo, setSaveTimeAgo] = useState(() => getRelativeTime(lastSaved));

  useEffect(() => {
    setSaveTimeAgo(getRelativeTime(lastSaved));
    const tick = setInterval(() => setSaveTimeAgo(getRelativeTime(lastSaved)), 30000);
    return () => clearInterval(tick);
  }, [lastSaved]);

  const handleExportPDF = async () => {
    if (!previewRef.current) return;
    
    const toastId = toast.loading('Preparing PDF... (This may take a moment)');
    const motionDiv = previewRef.current.closest('.print-wrapper')?.parentElement;
    let originalTransform = '';
    
    try {
      // Temporarily reset the scale transform of the motion.div parent to 1:1 to prevent html2canvas text overlapping bugs
      if (motionDiv) {
        originalTransform = motionDiv.style.transform;
        motionDiv.style.transform = 'none';
      }
      
      const canvas = await html2canvas(previewRef.current, { 
        scale: 2, 
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: previewRef.current.scrollWidth,
        windowHeight: previewRef.current.scrollHeight
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // A4 format in mm
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // Handle multi-page if content exceeds one page
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
      
      while (heightLeft > 0) {
        position = -(imgHeight - heightLeft);
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      
      const fileName = `${data.personal.firstName || 'Resume'}_${data.personal.lastName || 'Export'}.pdf`;
      
      // Use pdf.save() directly - most reliable cross-browser method
      pdf.save(fileName);
      
      toast.success('PDF Downloaded Successfully!', { id: toastId });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF. Please try again.', { id: toastId });
    } finally {
      // Restore original scale transform
      if (motionDiv) {
        motionDiv.style.transform = originalTransform;
      }
    }
  };

  const handleSave = async () => {
    const savePromise = forceSave();
    toast.promise(savePromise, {
      loading: 'Saving resume...',
      success: 'Resume saved successfully!',
      error: 'Failed to save resume.'
    });
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.4));
  const handleZoomReset = () => setZoomLevel(0.85);
  const toggleFullscreen = () => {
    setIsFullscreen(prev => {
      const next = !prev;
      setLeftSidebarOpen(!next);
      setRightSidebarOpen(!next);
      return next;
    });
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: 'var(--bg-color)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-body)'
      }}>
        {/* Header Skeleton */}
        <header style={{
          height: 'var(--header-height)',
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 2rem',
          justifyContent: 'space-between',
          background: 'var(--glass-bg)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', animation: 'pulse 1.5s infinite ease-in-out' }} />
            <div style={{ width: '120px', height: '18px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', animation: 'pulse 1.5s infinite ease-in-out' }} />
          </div>
          <div style={{ width: '150px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', animation: 'pulse 1.5s infinite ease-in-out' }} />
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ width: '80px', height: '36px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', animation: 'pulse 1.5s infinite ease-in-out' }} />
            <div style={{ width: '100px', height: '36px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', animation: 'pulse 1.5s infinite ease-in-out' }} />
          </div>
        </header>

        {/* Body Skeleton */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Left Form Panel Skeleton */}
          <aside style={{ width: 'var(--sidebar-width)', borderRight: '1px solid var(--glass-border)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'var(--glass-bg)' }}>
            <div style={{ height: '40px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', animation: 'pulse 1.5s infinite ease-in-out' }} />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ flex: 1, height: '24px', borderRadius: '6px', background: 'rgba(255,255,255,0.03)' }} />
              <div style={{ flex: 1, height: '24px', borderRadius: '6px', background: 'rgba(255,255,255,0.03)' }} />
              <div style={{ flex: 1, height: '24px', borderRadius: '6px', background: 'rgba(255,255,255,0.03)' }} />
            </div>
            <div style={{ flex: 1, borderRadius: '12px', background: 'rgba(255,255,255,0.02)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ height: '14px', borderRadius: '4px', background: 'rgba(255,255,255,0.03)', width: '30%' }} />
              <div style={{ height: '38px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)' }} />
              <div style={{ height: '14px', borderRadius: '4px', background: 'rgba(255,255,255,0.03)', width: '40%' }} />
              <div style={{ height: '38px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)' }} />
              <div style={{ height: '100px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)' }} />
            </div>
          </aside>

          {/* Center Preview Skeleton */}
          <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0e0e11', padding: '2rem' }}>
            <div style={{
              width: '210mm',
              height: '297mm',
              background: 'rgba(255,255,255,0.01)',
              border: '1px solid var(--glass-border)',
              borderRadius: '8px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              boxShadow: 'var(--shadow-xl)',
              animation: 'pulse 1.5s infinite ease-in-out'
            }}>
              <div style={{ alignSelf: 'center', width: '200px', height: '24px', borderRadius: '4px', background: 'rgba(255,255,255,0.03)' }} />
              <div style={{ alignSelf: 'center', width: '150px', height: '14px', borderRadius: '4px', background: 'rgba(255,255,255,0.03)' }} />
              <hr style={{ borderColor: 'var(--glass-border)' }} />
              <div style={{ height: '14px', borderRadius: '4px', background: 'rgba(255,255,255,0.03)' }} />
              <div style={{ height: '14px', borderRadius: '4px', background: 'rgba(255,255,255,0.03)', width: '80%' }} />
            </div>
          </main>
        </div>
        <style>{`
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 0.3; }
            100% { opacity: 0.6; }
          }
        `}</style>
      </div>
    );
  }

  const completion = calculateCompletion(data);
  const { score: atsScore } = calculateAtsScore(data);

  const tabs = ['Personal', 'Experience', 'Education', 'Projects', 'Certifications', 'Skills'];

  return (
    <div className={styles.dashboardContainer}>
      <Toaster position="bottom-right" toastOptions={{
        style: { background: '#27272a', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
      }} />
      
      {/* Top Navigation */}
      <header className={styles.topNav}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button 
            onClick={() => navigate('/dashboard')} 
            title="Back to Dashboard" 
            style={{ 
              padding: '6px', 
              borderRadius: '8px', 
              color: 'var(--text-secondary)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              cursor: 'pointer',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--glass-border)'
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <div style={{ height: '16px', width: '1px', background: 'var(--glass-border)', margin: '0 4px' }}></div>
          <input 
            type="text" 
            value={title}
            onChange={(e) => updateTitle(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: '1rem',
              outline: 'none',
              width: isMobile ? '100px' : '180px',
              padding: '4px 8px',
              borderRadius: '6px',
              transition: 'background var(--transition-fast)'
            }}
            onFocus={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            onBlur={(e) => e.currentTarget.style.background = 'transparent'}
            title="Click to rename"
          />
          <div style={{ height: '16px', width: '1px', background: 'var(--glass-border)', margin: '0 4px' }}></div>
          {/* Save Status Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginLeft: '0.25rem' }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: saving ? 'var(--color-warning)' : 'var(--color-success)',
              boxShadow: saving ? '0 0 8px var(--color-warning)' : '0 0 8px var(--color-success)',
              flexShrink: 0,
              transition: 'background 0.3s ease'
            }} />
            {!isMobile && (
              <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 500, whiteSpace: 'nowrap' }}>
                {saving
                  ? 'Saving…'
                  : lastSaved
                    ? `Saved to cloud · ${saveTimeAgo}`
                    : 'Saved to cloud'
                }
              </span>
            )}
          </div>
        </div>

        <div className={styles.headerCenter}>
          {!isMobile && (
            <select 
              className={styles.templateSelector}
              value={data.template} 
              onChange={(e) => updateTemplate(e.target.value)}
            >
              <option value="modern_tech">Modern Tech</option>
              <option value="minimal">Minimal</option>
              <option value="executive">Executive</option>
              <option value="elegant">Elegant</option>
              <option value="creative">Creative</option>
              <option value="corporate">Corporate</option>
              <option value="harvard">Harvard</option>
              <option value="stanford">Stanford</option>
              <option value="startup">Startup</option>
              <option value="developer">Software Engineer</option>
              <option value="product_manager">Product Manager</option>
              <option value="designer">Designer</option>
            </select>
          )}
          
          {(!isMobile || mobileMode === 'preview') && (
            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '2px' }}>
              <button className={styles.zoomBtn} onClick={handleZoomOut} title="Zoom Out" style={{ width: '28px', height: '28px' }}>
                <ZoomOut size={16} />
              </button>
              <span className={styles.zoomLevel} style={{ fontSize: '0.8rem', minWidth: '2.5rem' }}>{Math.round(zoomLevel * 100)}%</span>
              <button className={styles.zoomBtn} onClick={handleZoomIn} title="Zoom In" style={{ width: '28px', height: '28px' }}>
                <ZoomIn size={16} />
              </button>
              {!isMobile && (
                <>
                  <div style={{ width: '1px', height: '16px', background: 'var(--glass-border)', margin: '0 4px' }}></div>
                  <button className={styles.zoomBtn} onClick={toggleFullscreen} title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"} style={{ width: '28px', height: '28px' }}>
                    {isFullscreen ? <X size={16} /> : <Maximize size={16} />}
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <div className={styles.headerActions}>
          {!isMobile && (
            <button 
              className={`${styles.actionBtn}`} 
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
              style={{ 
                background: rightSidebarOpen ? 'var(--color-primary)' : 'var(--bg-surface)',
                color: rightSidebarOpen ? 'white' : 'var(--text-primary)',
                border: rightSidebarOpen ? 'none' : '1px solid var(--glass-border)'
              }}
            >
              <Target size={16} /> <span>ATS Scan</span>
            </button>
          )}
          <button className={`${styles.actionBtn} ${styles.saveBtn}`} onClick={handleSave} style={isMobile ? { padding: '0.4rem 0.6rem', gap: '0.25rem' } : {}}>
            <Save size={16} /> <span style={isMobile ? { display: 'inline', fontSize: '0.75rem' } : {}}>Save</span>
          </button>
          <button className={`${styles.actionBtn} ${styles.exportBtn}`} onClick={handleExportPDF} style={isMobile ? { padding: '0.4rem 0.6rem', gap: '0.25rem' } : {}}>
            <Download size={16} /> <span style={isMobile ? { display: 'inline', fontSize: '0.75rem' } : {}}>{isMobile ? 'PDF' : 'Export PDF'}</span>
          </button>
        </div>
      </header>

      {/* Main Workspace (Canvas-First) */}
      <div style={{ 
        position: 'relative', 
        height: 'calc(100vh - var(--header-height))', 
        width: '100%', 
        overflow: 'hidden',
        background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.05) 0%, var(--bg-color) 100%)'
      }}>
        
        {/* Subtle Dot Grid Background */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', 
          backgroundSize: '24px 24px', 
          pointerEvents: 'none',
          zIndex: 0
        }} />

        {/* Center Canvas - Hero Preview */}
        {(!isMobile || mobileMode === 'preview') && (
          <main className={`${styles.previewCanvas} ${isFullscreen ? styles.fullscreen : ''}`} style={{
            position: 'absolute',
            inset: 0,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: isFullscreen ? '2rem' : '2rem',
            paddingBottom: isMobile ? '6rem' : '4rem',
            paddingLeft: isFullscreen || isMobile ? '1rem' : leftSidebarOpen ? '490px' : '4rem',
            paddingRight: isFullscreen || isMobile ? '1rem' : rightSidebarOpen ? '420px' : '4rem',
            zIndex: 10
          }}>
            <motion.div 
              layout
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: isMobile ? zoomLevel * 0.7 : zoomLevel, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ transformOrigin: 'top center', width: 'max-content' }}
            >
              <LivePreview ref={previewRef} data={data} />
            </motion.div>
          </main>
        )}

        {/* Left Floating Panel (Editor) */}
        <AnimatePresence>
          {((leftSidebarOpen && !isFullscreen && !isMobile) || (isMobile && mobileMode === 'edit')) && (
            <motion.div
              initial={isMobile ? { opacity: 0, y: 50 } : { opacity: 0, x: -40 }}
              animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
              exit={isMobile ? { opacity: 0, y: 50 } : { opacity: 0, x: -40 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{
                position: 'absolute',
                left: isMobile ? 0 : '24px',
                top: isMobile ? 0 : '24px',
                bottom: isMobile ? '60px' : '24px',
                width: isMobile ? '100%' : '440px',
                background: isMobile ? 'var(--bg-color)' : 'rgba(24, 24, 27, 0.8)',
                backdropFilter: isMobile ? 'none' : 'blur(24px)',
                WebkitBackdropFilter: isMobile ? 'none' : 'blur(24px)',
                border: isMobile ? 'none' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: isMobile ? 0 : '16px',
                boxShadow: isMobile ? 'none' : '0 25px 50px -12px rgba(0,0,0,0.5)',
                display: 'flex',
                overflow: 'hidden',
                zIndex: 40
              }}
            >
              {/* Icon Rail */}
              <div style={{ 
                width: '64px', 
                background: 'rgba(0,0,0,0.2)', 
                borderRight: '1px solid rgba(255,255,255,0.05)', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                paddingTop: '1.5rem', 
                gap: '0.75rem' 
              }}>
                {[
                  { id: 'Personal', icon: <User size={20} /> },
                  { id: 'Experience', icon: <Briefcase size={20} /> },
                  { id: 'Education', icon: <GraduationCap size={20} /> },
                  { id: 'Projects', icon: <FolderGit2 size={20} /> },
                  { id: 'Certifications', icon: <Award size={20} /> },
                  { id: 'Skills', icon: <Wrench size={20} /> }
                ].map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: activeTab === tab.id ? 'var(--color-primary)' : 'transparent',
                      color: activeTab === tab.id ? '#fff' : 'var(--text-secondary)',
                      transition: 'all 0.2s',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    title={tab.id}
                  >
                    {tab.icon}
                  </button>
                ))}
              </div>

              {/* Form Content Area */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                <div style={{ padding: '1.5rem 1.5rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{activeTab}</h2>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Update your {activeTab.toLowerCase()} information.</p>
                </div>
                
                {/* Real-time stats */}
                <div style={{ padding: '1.25rem 1.5rem 0', display: 'flex', gap: '0.75rem' }}>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '0.6rem 0.75rem', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-tertiary)', marginBottom: '0.35rem', fontWeight: 600 }}>Completion</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', overflow: 'hidden' }}>
                        <div style={{ width: `${completion}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #a855f7)', borderRadius: '100px', transition: 'width 0.3s ease' }} />
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-primary)', minWidth: '1.5rem', textAlign: 'right' }}>{completion}%</span>
                    </div>
                  </div>
                </div>

                <div className={styles.sidebarContent} style={{ padding: '1.5rem' }}>
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {activeTab === 'Personal' && <PersonalInfoForm personal={data.personal} updatePersonal={updatePersonal} />}
                      {activeTab === 'Experience' && <ExperienceForm experience={data.experience} addListItem={addListItem} updateListItem={updateListItem} removeListItem={removeListItem} moveItemUp={moveItemUp} moveItemDown={moveItemDown} />}
                      {activeTab === 'Education' && <EducationForm education={data.education} addListItem={addListItem} updateListItem={updateListItem} removeListItem={removeListItem} moveItemUp={moveItemUp} moveItemDown={moveItemDown} />}
                      {activeTab === 'Projects' && <ProjectsForm projects={data.projects} addListItem={addListItem} updateListItem={updateListItem} removeListItem={removeListItem} moveItemUp={moveItemUp} moveItemDown={moveItemDown} />}
                      {activeTab === 'Certifications' && <CertificationsForm certifications={data.certifications} addListItem={addListItem} updateListItem={updateListItem} removeListItem={removeListItem} moveItemUp={moveItemUp} moveItemDown={moveItemDown} />}
                      {activeTab === 'Skills' && <SkillsForm skills={data.skills} addSkill={addSkill} removeSkill={removeSkill} />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Floating Panel (ATS Scanner) */}
        <AnimatePresence>
          {rightSidebarOpen && !isFullscreen && (
            <motion.aside 
              initial={{ width: 0, opacity: 0, x: 40 }}
              animate={{ width: isMobile ? '100%' : '380px', opacity: 1, x: 0 }}
              exit={{ width: 0, opacity: 0, x: 40 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{ 
                position: 'absolute',
                right: isMobile ? 0 : '24px',
                top: isMobile ? 0 : '24px',
                bottom: isMobile ? '60px' : '24px',
                background: 'rgba(24, 24, 27, 0.95)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: isMobile ? 'none' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: isMobile ? 0 : '16px',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                overflowX: 'hidden',
                zIndex: 50
              }}
            >
              {isMobile && (
                <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={() => setRightSidebarOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <X size={20} /> Close
                  </button>
                </div>
              )}
              <div style={{ padding: '1.5rem', width: isMobile ? '100%' : '380px' }}>
                <ATSOptimizer data={data} addSkill={addSkill} />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Mobile Bottom Navigation */}
        {isMobile && (
          <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60px',
            background: 'var(--bg-surface)',
            borderTop: '1px solid var(--glass-border)',
            display: 'flex',
            zIndex: 60,
            padding: '0 1rem'
          }}>
            <button
              onClick={() => { setMobileMode('edit'); setRightSidebarOpen(false); }}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: 'transparent', border: 'none', gap: '0.25rem',
                color: mobileMode === 'edit' && !rightSidebarOpen ? 'var(--color-primary)' : 'var(--text-secondary)'
              }}
            >
              <Edit3 size={20} />
              <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>Edit</span>
            </button>
            <button
              onClick={() => { setMobileMode('preview'); setRightSidebarOpen(false); }}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: 'transparent', border: 'none', gap: '0.25rem',
                color: mobileMode === 'preview' && !rightSidebarOpen ? 'var(--color-primary)' : 'var(--text-secondary)'
              }}
            >
              <Eye size={20} />
              <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>Preview</span>
            </button>
            <button
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: 'transparent', border: 'none', gap: '0.25rem',
                color: rightSidebarOpen ? 'var(--color-primary)' : 'var(--text-secondary)'
              }}
            >
              <Target size={20} />
              <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>ATS Scan</span>
            </button>
          </div>
        )}

      </div>

    </div>
  );
};

export default Dashboard;
