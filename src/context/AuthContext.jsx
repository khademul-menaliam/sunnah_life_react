import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../config/supabase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize Auth state
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      // Offline / Local development fallback: check localStorage for guest or local session
      const savedUser = localStorage.getItem('sunnah_local_user');
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          setUser(parsed);
          setProfile(parsed);
        } catch (e) {
          console.error(e);
        }
      }
      setLoading(false);
      return;
    }

    // 1. Get initial Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // 2. Listen to Supabase auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          await fetchProfile(session.user.id);
        } else {
          setUser(null);
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.warn('Profile fetch error:', error.message);
      } else {
        setProfile(data);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    if (!isSupabaseConfigured()) {
      // Demo local login
      const demoUser = {
        id: 'local-demo-user-1',
        email,
        name: email.split('@')[0],
        is_admin: email.includes('admin'),
        city: 'Dhaka',
        country: 'Bangladesh',
        latitude: 23.8103,
        longitude: 90.4125,
        madhab: 'Hanafi',
        prayer_calculation_method: 'Karachi'
      };
      localStorage.setItem('sunnah_local_user', JSON.stringify(demoUser));
      setUser(demoUser);
      setProfile(demoUser);
      return { data: { user: demoUser }, error: null };
    }

    const res = await supabase.auth.signInWithPassword({ email, password });
    return res;
  };

  const signUp = async (email, password, name = '') => {
    if (!isSupabaseConfigured()) {
      const demoUser = {
        id: 'local-user-' + Date.now(),
        email,
        name: name || email.split('@')[0],
        is_admin: false,
        city: 'Dhaka',
        country: 'Bangladesh',
        latitude: 23.8103,
        longitude: 90.4125,
        madhab: 'Hanafi',
        prayer_calculation_method: 'Karachi'
      };
      localStorage.setItem('sunnah_local_user', JSON.stringify(demoUser));
      setUser(demoUser);
      setProfile(demoUser);
      return { data: { user: demoUser }, error: null };
    }

    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });
    return res;
  };

  const signOut = async () => {
    if (!isSupabaseConfigured()) {
      localStorage.removeItem('sunnah_local_user');
      setUser(null);
      setProfile(null);
      return;
    }
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (updates) => {
    if (!isSupabaseConfigured()) {
      const updated = { ...profile, ...updates };
      localStorage.setItem('sunnah_local_user', JSON.stringify(updated));
      setProfile(updated);
      return { data: updated, error: null };
    }

    if (!user) return { error: { message: 'Not logged in' } };

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (!error && data) {
      setProfile(data);
    }
    return { data, error };
  };

  const isAdmin = Boolean(profile?.is_admin);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAdmin,
        loading,
        signIn,
        signUp,
        signOut,
        updateProfile,
        isConfigured: isSupabaseConfigured()
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
