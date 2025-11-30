// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,
  });

  useEffect(() => {
    // Redirige si ya hay usuario loggeado
    if (user.token) {
      if (user.role === 'ADMIN') navigate('/admin');
      else if (user.role === 'TUTOR') navigate('/home');
    }
  }, [user, navigate]);

  const loginUser = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setUser({ token, role });
    if (role === 'ADMIN') navigate('/admin');
    else navigate('/home');
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser({ token: null, role: null });
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
