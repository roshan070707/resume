import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';
const Navbar = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  return (
    <motion.nav 
      className={styles.navbar}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.container}>
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer', outline: 'none' }}>
          <Logo size={28} />
        </div>

        <ul className={styles.navLinks}>
          <li><span onClick={() => { navigate('/'); setTimeout(() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className={styles.link} style={{cursor: 'pointer'}}>Features</span></li>
          <li><span onClick={() => navigate('/templates')} className={styles.link} style={{cursor: 'pointer'}}>Templates</span></li>
          <li><span onClick={() => navigate('/ats')} className={styles.link} style={{cursor: 'pointer'}}>ATS Score</span></li>
        </ul>

        <div className={styles.authButtons} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {user ? (
            <>
              <div 
                onClick={() => navigate('/dashboard')}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '8px',
                  transition: 'background var(--transition-fast)'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
                ) : (
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(99,102,241,0.1)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.8rem' }}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }} className="hidden-mobile">
                  {user.name.split(' ')[0]}
                </span>
              </div>
              <button className={styles.loginBtn} onClick={() => navigate('/dashboard')}>Dashboard</button>
              <button 
                style={{ 
                  color: 'var(--text-secondary)', 
                  fontSize: '0.85rem', 
                  fontWeight: 500,
                  cursor: 'pointer',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--glass-border)',
                  background: 'rgba(255,255,255,0.02)',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)';
                  e.currentTarget.style.color = 'var(--color-danger)';
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--glass-border)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                }}
                onClick={signOut}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button className={styles.loginBtn} onClick={() => navigate('/auth')}>Login</button>
              <button className={styles.getStartedBtn} onClick={() => navigate('/auth')}>Get Started</button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
