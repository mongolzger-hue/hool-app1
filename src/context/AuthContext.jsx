import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated check from localStorage
    const savedUser = localStorage.getItem('hool_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulated login logic
    const userData = {
      id: 'user_123',
      email,
      name: email.split('@')[0],
      isPremium: false,
      joinDate: new Date().toLocaleDateString('mn-MN')
    };
    setUser(userData);
    localStorage.setItem('hool_user', JSON.stringify(userData));
    return true;
  };

  const register = (email, password) => {
    // Simulated registration
    return login(email, password);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hool_user');
  };

  const setPremium = (status) => {
    if (!user) return;
    const updatedUser = { ...user, isPremium: status };
    setUser(updatedUser);
    localStorage.setItem('hool_user', JSON.stringify(updatedUser));
  };

  const updateProfile = (profileData) => {
    if (!user) return;
    const updatedUser = { ...user, profile: profileData };
    setUser(updatedUser);
    localStorage.setItem('hool_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setPremium, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
