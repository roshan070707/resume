import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Mail, Lock, User, Eye, EyeOff, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import styles from './Auth.module.css';

const Auth = () => {
  const { user, signUp, signIn, resetPassword, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    try {
      if (isForgot) {
        await resetPassword(email);
        setIsForgot(false);
      } else if (isSignUp) {
        const res = await signUp(email, password, name);
        if (res.success) {
          // Reset forms
          setEmail('');
          setPassword('');
          setName('');
        }
      } else {
        await signIn(email, password);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setSubmitting(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleTab = (signUpTab) => {
    setIsSignUp(signUpTab);
    setIsForgot(false);
    setPassword('');
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.bgGlow}></div>
      <div className={styles.bgGlow2}></div>

      <motion.div 
        className={styles.authCard}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo and Brand */}
        <div className={styles.logoArea} onClick={() => navigate('/')}>
          <ShieldCheck className={styles.logoIcon} size={36} />
          <div className={styles.logoText}>
            Resume<span className={styles.logoHighlight}>Studio</span>
          </div>
        </div>

        {/* Tab Selection */}
        {!isForgot && (
          <div className={styles.tabs}>
            <button 
              className={`${styles.tabBtn} ${!isSignUp ? styles.activeTab : ''}`}
              onClick={() => toggleTab(false)}
              disabled={submitting}
            >
              Sign In
            </button>
            <button 
              className={`${styles.tabBtn} ${isSignUp ? styles.activeTab : ''}`}
              onClick={() => toggleTab(true)}
              disabled={submitting}
            >
              Sign Up
            </button>
          </div>
        )}

        {!isForgot && (
          <>
            <button
              type="button"
              className={styles.googleBtn}
              onClick={handleGoogleSignIn}
              disabled={submitting}
            >
              {submitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <svg className={styles.googleIcon} viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </>
              )}
            </button>
            <div className={styles.divider}>
              <span>or continue with email</span>
            </div>
          </>
        )}

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {isForgot ? (
              // Reset Password Panel
              <motion.div
                key="forgot"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Reset Password</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Enter your email address and we'll send you a link to reset your password.
                </p>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Email Address</label>
                  <div className={styles.inputWrapper}>
                    <Mail className={styles.inputIcon} size={16} />
                    <input 
                      type="email" 
                      required
                      placeholder="you@example.com"
                      className={styles.input}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      disabled={submitting}
                    />
                  </div>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={submitting}>
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : 'Send Reset Link'}
                </button>

                <div className={styles.backToLogin} onClick={() => setIsForgot(false)}>
                  <ArrowLeft className={styles.backIcon} size={14} /> Back to Sign In
                </div>
              </motion.div>
            ) : (
              // Sign In or Sign Up Form
              <motion.div
                key={isSignUp ? 'signup' : 'signin'}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                {isSignUp && (
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Full Name</label>
                    <div className={styles.inputWrapper}>
                      <User className={styles.inputIcon} size={16} />
                      <input 
                        type="text" 
                        required
                        placeholder="John Doe"
                        className={styles.input}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        disabled={submitting}
                      />
                    </div>
                  </div>
                )}

                <div className={styles.formGroup}>
                  <label className={styles.label}>Email Address</label>
                  <div className={styles.inputWrapper}>
                    <Mail className={styles.inputIcon} size={16} />
                    <input 
                      type="email" 
                      required
                      placeholder="you@example.com"
                      className={styles.input}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className={styles.label}>Password</label>
                    {!isSignUp && (
                      <span className={styles.forgotBtn} onClick={() => setIsForgot(true)}>
                        Forgot Password?
                      </span>
                    )}
                  </div>
                  <div className={styles.inputWrapper}>
                    <Lock className={styles.inputIcon} size={16} />
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      required
                      placeholder="••••••••"
                      className={`${styles.input} ${styles.inputWithToggle}`}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      disabled={submitting}
                    />
                    <div className={styles.eyeButton} onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </div>
                  </div>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={submitting}>
                  {submitting ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      {isSignUp ? 'Create Account' : 'Sign In'} 
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  );
};

export default Auth;
