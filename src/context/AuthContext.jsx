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
    if (!sessionUser) {
      setUser(null);
      return null;
    }

    try {
      const profile = await getProfile(sessionUser.id);
      const userData = {
        ...sessionUser,
        ...profile,
        name: profile?.name || sessionUser.user_metadata?.full_name || sessionUser.email.split('@')[0],
        phone: profile?.phone || sessionUser.user_metadata?.phone || '',
        isPremium: profile?.is_premium || false,
        profile: profile?.profile_data || null,
        joinDate: new Date(sessionUser.created_at).toLocaleDateString('mn-MN')
      };
      setUser(userData);
      return userData;
    } catch (err) {
      console.error('Error in fetchAndSetUser:', err);
      setUser(sessionUser); // Fallback to basic user info
      return sessionUser;
    }
  };

  useEffect(() => {
    // 1. Initial check
    const checkUser = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        await fetchAndSetUser(session?.user);
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      await fetchAndSetUser(session?.user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    
    // Ensure state is updated before returning to the caller (fixes race conditions)
    if (data.user) {
      await fetchAndSetUser(data.user);
    }
    return !!data.user;
  };

  const register = async (email, password, fullName, phone) => {
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

    if (error) throw error;

    if (data.user) {
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

    return !!data.user;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
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
