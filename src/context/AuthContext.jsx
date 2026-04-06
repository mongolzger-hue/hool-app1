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

  useEffect(() => {
    // 1. Initial check
    const checkUser = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        
        if (session?.user) {
          const profile = await getProfile(session.user.id);
          setUser({
            ...session.user,
            ...profile,
            name: profile?.name || session.user.user_metadata?.full_name || session.user.email.split('@')[0],
            phone: profile?.phone || session.user.user_metadata?.phone || '',
            isPremium: profile?.is_premium || false,
            profile: profile?.profile_data || null,
            joinDate: new Date(session.user.created_at).toLocaleDateString('mn-MN')
          });
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        if (session?.user) {
          const profile = await getProfile(session.user.id);
          setUser({
            ...session.user,
            ...profile,
            name: profile?.name || session.user.user_metadata?.full_name || session.user.email.split('@')[0],
            phone: profile?.phone || session.user.user_metadata?.phone || '',
            isPremium: profile?.is_premium || false,
            profile: profile?.profile_data || null,
            joinDate: new Date(session.user.created_at).toLocaleDateString('mn-MN')
          });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Auth change handling error:', err);
      } finally {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
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
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          name: fullName,
          email: email,
          phone: phone,
          is_premium: false,
          profile_data: null
        });
      
      if (profileError) {
        console.error('Error creating profile manually:', profileError);
      }
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
