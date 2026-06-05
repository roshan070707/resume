import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowLeft, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import styles from './Pricing.module.css';

const Pricing = () => {
  const navigate = useNavigate();
  const { user, upgradeToPremium } = useAuth();

  const handleUpgrade = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    const res = await upgradeToPremium();
    if (res.success) {
      navigate('/dashboard');
    }
  };

  const isPremium = user?.plan === 'premium';

  return (
    <div className={styles.pricingContainer}>
      <div className={styles.backgroundEffects}>
        <div className={styles.glow} />
        <div className={styles.glow2} />
      </div>

      <div className={styles.navBar}>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          <ArrowLeft size={20} /> Back
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Simple, Transparent Pricing</h1>
          <p>Choose the plan that fits your career goals. Upgrade anytime to unlock the full potential of ResumeForge.</p>
        </div>

        <div className={styles.grid}>
          {/* Free Tier */}
          <div className={styles.card}>
            <div className={styles.cardName}>Free</div>
            <div className={styles.price}>$0<span>/forever</span></div>
            <ul className={styles.features}>
              <li className={styles.feature}><Check size={18} className={styles.checkIcon} /> 1 Resume limit</li>
              <li className={styles.feature}><Check size={18} className={styles.checkIcon} /> Basic Templates</li>
              <li className={styles.feature}><Check size={18} className={styles.checkIcon} /> Standard ATS Scanning</li>
              <li className={styles.feature}><Check size={18} className={styles.checkIcon} /> PDF Export</li>
            </ul>
            <button 
              className={`${styles.btn} ${styles.freeBtn}`}
              onClick={() => navigate('/dashboard')}
              disabled={isPremium}
            >
              {isPremium ? 'Included' : 'Current Plan'}
            </button>
          </div>

          {/* Premium Tier */}
          <div className={`${styles.card} ${styles.premiumCard}`}>
            <div className={styles.popularBadge}>Most Popular</div>
            <div className={styles.cardName}>Premium</div>
            <div className={styles.price}>$9<span>.99/month</span></div>
            <ul className={styles.features}>
              <li className={styles.feature}><Check size={18} className={styles.checkIcon} /> Unlimited Resumes</li>
              <li className={styles.feature}><Check size={18} className={styles.checkIcon} /> Unlock All Premium Templates</li>
              <li className={styles.feature}><Check size={18} className={styles.checkIcon} /> Advanced AI Optimization</li>
              <li className={styles.feature}><Check size={18} className={styles.checkIcon} /> AI Cover Letter Builder</li>
              <li className={styles.feature}><Check size={18} className={styles.checkIcon} /> Priority Support</li>
            </ul>
            <button 
              className={`${styles.btn} ${isPremium ? styles.disabledBtn : styles.premiumBtn}`}
              onClick={handleUpgrade}
              disabled={isPremium}
            >
              {isPremium ? 'You are Premium' : <><Star size={18} /> Upgrade Now</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
