// src/components/LoginForm.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const API_URL = 'http://localhost:8095/auth';

const LoginForm = () => {
  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Intentar login
      const loginRes = await axios.post(`${API_URL}/login`, { email, password });
      loginUser(loginRes.data.token, loginRes.data.role);
    } catch (err) {
      // Si usuario no existe → registrar como TUTOR
      if (err.response?.data?.message === 'Usuario no encontrado' || err.message.includes('Usuario no encontrado')) {
        try {
          await axios.post(`${API_URL}/register`, { email, password, role: 'TUTOR' });
          // Luego login automático
          const loginRes = await axios.post(`${API_URL}/login`, { email, password });
          loginUser(loginRes.data.token, loginRes.data.role);
        } catch (regErr) {
          setError('Error al registrar usuario.');
          console.error(regErr);
        }
      } else {
        setError('Email o contraseña incorrecta.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="border p-2 w-full mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
