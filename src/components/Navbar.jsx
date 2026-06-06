import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, signOut, setIsAuthModalOpen } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (path, scrollTo) => {
    setMobileMenuOpen(false);
    navigate(path);
    if (scrollTo) {
      setTimeout(() => document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  return (
    <motion.nav 
      className={styles.navbar}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.container}>
        <div onClick={() => handleNav('/')} style={{ cursor: 'pointer', outline: 'none' }}>
          <Logo size={28} />
        </div>

        {/* Desktop Nav Links */}
        <ul className={styles.navLinks}>
          <li><span onClick={() => handleNav('/', 'features')} className={styles.link} style={{cursor: 'pointer'}}>Features</span></li>
          <li><span onClick={() => handleNav('/templates')} className={styles.link} style={{cursor: 'pointer'}}>Templates</span></li>
          <li><span onClick={() => handleNav('/ats')} className={styles.link} style={{cursor: 'pointer'}}>ATS Score</span></li>
        </ul>

        {/* Desktop Auth Buttons */}
        <div className={styles.authButtons}>
          {user ? (
            <>
              <div 
                onClick={() => navigate('/dashboard')}
                className={styles.userAvatar}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
                ) : (
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(99,102,241,0.1)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.8rem' }}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className={styles.userName}>
                  {user.name.split(' ')[0]}
                </span>
              </div>
              <button className={styles.loginBtn} onClick={() => navigate('/dashboard')}>Dashboard</button>
              <button className={styles.logoutBtn} onClick={signOut}>Logout</button>
            </>
          ) : (
            <button className={styles.getStartedBtn} onClick={() => setIsAuthModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button className={styles.hamburger} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Slide-Down Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.mobileMenuInner}>
              <span onClick={() => handleNav('/', 'features')} className={styles.mobileLink}>Features</span>
              <span onClick={() => handleNav('/templates')} className={styles.mobileLink}>Templates</span>
              <span onClick={() => handleNav('/ats')} className={styles.mobileLink}>ATS Score</span>
              
              <div className={styles.mobileDivider} />
              
              {user ? (
                <>
                  <span onClick={() => handleNav('/dashboard')} className={styles.mobileLink}>Dashboard</span>
                  <button onClick={() => { signOut(); setMobileMenuOpen(false); }} className={styles.mobileLogout}>Logout</button>
                </>
              ) : (
                <button onClick={() => { setIsAuthModalOpen(true); setMobileMenuOpen(false); }} className={styles.mobileCta}>
                  <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg>
                  Sign in with Google
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
