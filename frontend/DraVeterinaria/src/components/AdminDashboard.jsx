// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import * as XLSX from 'xlsx';
import ServiceManager from './ServiceManager';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [especies, setEspecies] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [tutores, setTutores] = useState([]);

  // No necesitamos Authorization mientras la API está abierta
  useEffect(() => {
    // Fetch especies
    fetch('http://localhost:8090/api/especies')
      .then(res => res.json())
      .then(data => setEspecies(data))
      .catch(err => console.error('Error fetch especies:', err));

    // Fetch mascotas
    fetch('http://localhost:8090/api/mascotas')
      .then(res => res.json())
      .then(data => setMascotas(data))
      .catch(err => console.error('Error fetch mascotas:', err));

    // Fetch tutores
    fetch('http://localhost:8090/api/tutores')
      .then(res => res.json())
      .then(data => setTutores(data))
      .catch(err => console.error('Error fetch tutores:', err));
  }, []);

  // Contar cantidad de mascotas por especie
  const countMascotasPorEspecie = () => {
    return especies.map(e => {
      const cantidad = mascotas.filter(
        m => m.especie && m.especie.idEspecie === e.idEspecie
      ).length;
      return cantidad;
    });
  };

  const chartData = {
    labels: especies.map(e => e.nombreEspecie), // ⚠️ nombreEspecie según tu API
    datasets: [
      {
        label: 'Cantidad de Mascotas por Especie',
        data: countMascotasPorEspecie(),
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      },
    ],
  };

  const exportToXLSX = () => {
  const data = [];
  tutores.forEach(t => {
    t.mascotas.forEach(m => {
      data.push({
        'Nombre Tutor': t.nombreTutor,
        'Email Tutor': t.email,
        'Nombre Mascota': m.nombreMascota,
        'Especie': m.especie?.nombreEspecie || '',
        'Fecha Nacimiento': m.fechaNacimiento || '',
      });
    });
  });

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Tutores y Mascotas');
  XLSX.writeFile(wb, 'tutores_mascotas.xlsx');
};



  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard Admin</h1>
      

      <div className="w-full max-w-xl mb-8 bg-white p-4 rounded shadow">
        {especies.length > 0 && mascotas.length > 0 ? (
          <Bar data={chartData} />
        ) : (
          <p>Cargando datos del gráfico...</p>
        )}
      </div>

      <button
        className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-4"
        onClick={exportToXLSX}
      >
        Exportar Tutores y Mascotas a XLSX
      </button>

      <button
        className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={handleLogout}
      >
        Cerrar sesión
      </button>
      <ServiceManager />
    </div>
  );
};

export default AdminDashboard;
