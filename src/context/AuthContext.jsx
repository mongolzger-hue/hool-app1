import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch full profile (premium status, etc) from DB
  const getProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  // Standardized way to fetch profile and update session state
  const fetchAndSetUser = async (sessionUser) => {
    console.log('[AuthContext] fetchAndSetUser starting for:', sessionUser?.id);
    if (!sessionUser) {
      console.log('[AuthContext] No session user, setting to null');
      setUser(null);
      return null;
    }

    try {
      console.log('[AuthContext] Fetching profile from DB...');
      const profilePromise = getProfile(sessionUser.id);
      
      // Add a timeout fallback for profile fetch to prevent infinite loading
      const profile = await Promise.race([
        profilePromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Profile fetch timeout')), 10000))
      ]);
      
      console.log('[AuthContext] Profile fetched:', !!profile);
      
      const safeName = profile?.name || 
                        sessionUser.user_metadata?.full_name || 
                        (sessionUser.email ? sessionUser.email.split('@')[0] : 'Хэрэглэгч');

      const userData = {
        ...sessionUser,
        ...profile,
        name: safeName,
        phone: profile?.phone || sessionUser.user_metadata?.phone || '',
        isPremium: profile?.is_premium || false,
        profile: profile?.profile_data || null,
        joinDate: new Date(sessionUser.created_at).toLocaleDateString('mn-MN')
      };
      
      setUser(userData);
      console.log('[AuthContext] User state updated successfully.');
      return userData;
    } catch (err) {
      console.error('[AuthContext] Error in fetchAndSetUser:', err);
      setUser(sessionUser); // Fallback to basic user info
      return sessionUser;
    }
  };

  useEffect(() => {
    console.log('[AuthContext] Initializing auth check...');
    // 1. Initial check
    const checkUser = async () => {
      try {
        if (!supabase) {
          console.error('[AuthContext] Supabase client is NOT initialized!');
          return;
        }
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        console.log('[AuthContext] Initial session found:', !!session);
        await fetchAndSetUser(session?.user);
      } catch (err) {
        console.error('[AuthContext] Auth initialization error:', err);
      } finally {
        console.log('[AuthContext] Loading complete.');
        setLoading(false);
      }
    };

    checkUser();

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[AuthContext] onAuthStateChange fired:', event);
      await fetchAndSetUser(session?.user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    console.log('[AuthContext] login() called for:', email);
    if (!supabase) throw new Error('Supabase client not initialized');
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('[AuthContext] signInWithPassword error:', error);
      throw error;
    }
    
    console.log('[AuthContext] signInWithPassword success, fetching user data...');
    // Ensure state is updated before returning to the caller (fixes race conditions)
    if (data.user) {
      await fetchAndSetUser(data.user);
    }
    console.log('[AuthContext] login() returning with user:', !!data.user);
    return !!data.user;
  };

  const register = async (email, password, fullName, phone) => {
    console.log('[AuthContext] register() called for:', email);
    if (!supabase) throw new Error('Supabase client not initialized');
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
        },
      },
    });

    if (error) {
      console.error('[AuthContext] signUp error:', error);
      throw error;
    }

    if (data.user) {
      console.log('[AuthContext] signUp success, creating profile...');
      // Manually create profile if trigger is missing
      await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          name: fullName,
          email: email,
          phone: phone,
          is_premium: false,
          profile_data: null
        });
      
      // Update state before returning (fixes race conditions)
      await fetchAndSetUser(data.user);
    }

    console.log('[AuthContext] register() returning with user:', !!data.user);
    return !!data.user;
  };

  const logout = async () => {
    console.log('[AuthContext] Logging out...');
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    console.log('[AuthContext] Logout complete.');
  };

  const setPremium = async (status) => {
    if (!user) return;
    const { error } = await supabase
      .from('profiles')
      .update({ is_premium: status })
      .eq('id', user.id);
    
    if (error) console.error('Error updating premium:', error);
    else setUser(prev => ({ ...prev, isPremium: status }));
  };

  const updateProfile = async (profileData) => {
    if (!user) return;
    const { error } = await supabase
      .from('profiles')
      .update({ profile_data: profileData })
      .eq('id', user.id);
    
    if (error) console.error('Error updating profile:', error);
    else setUser(prev => ({ ...prev, profile: profileData }));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setPremium, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
