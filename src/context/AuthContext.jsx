import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

/** Formats a raw Supabase User object into a clean app-level user shape. */
const formatUser = (supabaseUser) => {
  if (!supabaseUser) return null;
  const meta = supabaseUser.user_metadata || {};
  return {
    id: supabaseUser.id,
    email: supabaseUser.email,
    name: meta.full_name || meta.name || supabaseUser.email.split('@')[0],
    avatar: meta.avatar_url || meta.picture || null,
    plan: meta.plan || 'free',
    created_at: supabaseUser.created_at,
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use getUser() for a secure server-side verified session on initial load.
    supabase.auth.getUser().then(({ data: { user: supabaseUser } }) => {
      setUser(formatUser(supabaseUser));
      setLoading(false);
    });

    // Stream real-time auth state changes (login, logout, token refresh).
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(formatUser(session?.user ?? null));
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  /** Create a new account with email + password. */
  const signUp = async (email, password, name) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });
      if (error) throw error;

      // Client-side profile insert fallback (in case SQL trigger hasn't run yet).
      if (data?.user) {
        try {
          await supabase.from('profiles').upsert([{
            id: data.user.id,
            email: data.user.email,
            full_name: name,
          }]);
        } catch (_profileErr) {
          // Silently ignore — the SQL trigger covers this in production.
        }
      }

      toast.success('Account created! Check your email for a verification link.');
      return { success: true, data };
    } catch (error) {
      toast.error(error.message || 'Failed to sign up');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  /** Sign in with email + password. */
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success('Logged in successfully!');
      return { success: true, data };
    } catch (error) {
      toast.error(error.message || 'Login failed');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  /** Sign out the current session. */
  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      toast.success('Logged out successfully.');
    } catch (error) {
      toast.error(error.message || 'Logout failed');
    } finally {
      setLoading(false);
    }
  };

  /** Send a password reset email. */
  const resetPassword = async (email) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`,
      });
      if (error) throw error;
      toast.success('Password reset link sent to your email!');
      return { success: true };
    } catch (error) {
      toast.error(error.message || 'Password reset failed');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  /** Upgrade user to Premium plan. */
  const upgradeToPremium = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { plan: 'premium' }
      });
      if (error) throw error;
      setUser(formatUser(data.user));
      toast.success('Successfully upgraded to Premium!');
      return { success: true };
    } catch (error) {
      toast.error(error.message || 'Upgrade failed');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Initiate Google OAuth sign-in via Supabase.
   * The browser will redirect to Google's consent screen.
   * On success Google redirects back and onAuthStateChange fires.
   */
  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
      // No return value — the page will redirect to Google.
    } catch (error) {
      toast.error(error.message || 'Google sign-in failed');
      return { success: false, error };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, resetPassword, signInWithGoogle, upgradeToPremium }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
