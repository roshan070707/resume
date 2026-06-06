import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Loader2, X, Lock, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import styles from './AuthModal.module.css';

const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, signInWithGoogle } = useAuth();
  const [submitting, setSubmitting] = React.useState(false);

  const handleGoogleSignIn = async () => {
    setSubmitting(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <motion.div
          className={styles.modalOverlay}
          onClick={() => setIsAuthModalOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.modalInner}>
              <button className={styles.closeBtn} onClick={() => setIsAuthModalOpen(false)}>
                <X size={16} />
              </button>

              <div className={styles.logoArea}>
                <div className={styles.logoIconWrap}>
                  <ShieldCheck className={styles.logoIcon} size={32} />
                </div>
                <div className={styles.logoText}>
                  Resume<span className={styles.logoHighlight}>Studio</span>
                </div>
                <p className={styles.subtitle}>
                  Build your dream resume in minutes
                </p>
              </div>

              <div className={styles.divider}>
                <div className={styles.dividerLine} />
                <span className={styles.dividerText}>continue with</span>
                <div className={styles.dividerLine} />
              </div>

              <div className={styles.actionArea}>
                <button
                  type="button"
                  className={styles.googleBtnLarge}
                  onClick={handleGoogleSignIn}
                  disabled={submitting}
                >
                  {submitting ? (
                    <Loader2 size={22} style={{ animation: 'spin 1s linear infinite' }} />
                  ) : (
                    <>
                      <svg className={styles.googleIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                      </svg>
                      Sign in with Google
                    </>
                  )}
                </button>
              </div>

              <div className={styles.trustRow}>
                <div className={styles.trustItem}>
                  <Lock size={13} />
                  <span>Encrypted</span>
                </div>
                <div className={styles.trustItem}>
                  <ShieldCheck size={13} />
                  <span>Secure</span>
                </div>
                <div className={styles.trustItem}>
                  <Zap size={13} />
                  <span>Instant</span>
                </div>
              </div>

              <p className={styles.termsText}>
                By continuing, you agree to our{' '}
                <span className={styles.termsLink}>Terms of Service</span>{' '}
                and{' '}
                <span className={styles.termsLink}>Privacy Policy</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
