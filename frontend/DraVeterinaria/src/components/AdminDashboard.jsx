// src/components/AdminDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Dashboard Admin</h1>
      <p className="mb-4">Aquí se hace todo como ADMIN.</p>
      <button
        className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={handleLogout}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default AdminDashboard;
