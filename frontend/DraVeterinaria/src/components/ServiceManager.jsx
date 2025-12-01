import React, { useState, useEffect } from "react";

// Endpoint de la API para Servicios
const API_URL_SERVICES = "http://localhost:8090/api/servicios";

const ServiceManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Estado para manejar qué servicio se está editando y sus datos temporales
  const [editingService, setEditingService] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [actionLoading, setActionLoading] = useState({}); // Para manejar estados de carga por acción (Delete/Save)

  // Función para obtener todos los servicios (GET)
  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      
      const response = await fetch(API_URL_SERVICES); 
      if (!response.ok) {
        throw new Error("Error al cargar los servicios. Código: " + response.status);
      }
      const data = await response.json();
      
      
      const sortedData = data.sort((a, b) => {
        // Convertimos las cadenas de fecha a objetos Date para una comparación precisa.
        const dateA = new Date(a.fecha);
        const dateB = new Date(b.fecha);
        
        // Retornamos dateA - dateB para un orden ascendente (más cercano primero).
        return dateA - dateB;
      });
      

      setServices(sortedData);
    } catch (err) {
      console.error("Error al obtener servicios:", err);
      setError(err.message || "No se pudieron cargar los servicios.");
    } finally {
      setLoading(false);
    }
  };

  // Carga inicial de servicios
  useEffect(() => {
    fetchServices();
  }, []);

  // Función para iniciar la edición (PUT)
  const handleEdit = (service) => {
    setEditingService(service);
    const datePart = service.fecha ? service.fecha.split('T')[0] : ''; 
    setNewDate(datePart);
  };

  // Función para guardar la edición del servicio (PUT)
  const handleSaveEdit = async () => {
    if (!editingService || !newDate) {
        console.error("No hay servicio o fecha válida para guardar.");
        return;
    }
    
    setActionLoading(prev => ({ ...prev, save: true }));
    const idServicio = editingService.idServicio;
    
    // El objeto a enviar DEBE contener todas las dependencias (mascota, subtipo, costo) 
    // y solo se actualiza la fecha.
    const updatedData = {
        mascota: { idMascota: editingService.mascota.idMascota },
        subtipo: { idSubtipo: editingService.subtipo.idSubtipo },
        costo: editingService.costo,
        // Formato esperado por el backend: YYYY-MM-DDT10:00:00
        fecha: `${newDate}T10:00:00` 
    };

    try {
        const response = await fetch(`${API_URL_SERVICES}/${idServicio}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: No se pudo actualizar el servicio.`);
        }

        console.log(`Servicio ${idServicio} actualizado con éxito.`);
        setEditingService(null);
        setNewDate("");
        fetchServices(); // Refresca la lista
    } catch (err) {
        console.error("Error al actualizar servicio:", err);
        setError(err.message || "Error al actualizar el servicio. Intenta de nuevo.");
    } finally {
        setActionLoading(prev => ({ ...prev, save: false }));
    }
  };


  // Función para eliminar un servicio (DELETE)
  const handleDelete = async (idServicio) => {
    // Usamos 'confirm' en lugar de 'window.confirm'
    if (!confirm(`¿Estás seguro de que deseas eliminar el servicio ${idServicio}?`)) {
        return;
    }
    
    setActionLoading(prev => ({ ...prev, [idServicio]: true }));
    try {
      const response = await fetch(`${API_URL_SERVICES}/${idServicio}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo eliminar el servicio.`);
      }

      console.log(`Servicio ${idServicio} eliminado con éxito.`);
      fetchServices(); // Refresca la lista

    } catch (err) {
      console.error("Error al eliminar servicio:", err);
      setError(err.message || "Error al eliminar el servicio. Intenta de nuevo.");
    } finally {
      setActionLoading(prev => ({ ...prev, [idServicio]: false }));
    }
  };


  const isGlobalDisabled = loading || actionLoading.save;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-800">
             Mantenedor de Servicios Agendados
        </h1>

        <div className="w-full max-w-5xl bg-white p-6 rounded-xl shadow-2xl">
            
            <div className="mb-6 flex justify-between items-center border-b pb-4">
                <p className="text-gray-600 font-medium">Servicios totales: {services.length}</p>
                <button
                    onClick={fetchServices}
                    disabled={loading}
                    className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md 
                               hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
                >
                    {loading ? "Cargando..." : "Recargar Lista "}
                </button>
            </div>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                    <p className="font-bold">Error de Carga/Operación</p>
                    <p className="text-sm">{error}</p>
                </div>
            )}

            {!loading && services.length === 0 && !error && (
                <p className="text-gray-600 text-center py-10">
                    No hay servicios registrados para mostrar.
                </p>
            )}

            {!loading && services.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-100">
                        <thead className="bg-indigo-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Mascota</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Subtipo</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Costo</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Fecha</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-indigo-700 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {services.map((service) => {
                                const isEditing = editingService && editingService.idServicio === service.idServicio;
                                const isDeleting = actionLoading[service.idServicio];
                                const isDisabled = isGlobalDisabled || isDeleting;
                                
                                return (
                                    <tr key={service.idServicio} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {service.idServicio}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {service.mascota?.nombreMascota || "N/A"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {service.subtipo?.nombreSubtipo || "N/A"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            ${service.costo}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {isEditing ? (
                                                <input
                                                    type="date"
                                                    value={newDate}
                                                    onChange={(e) => setNewDate(e.target.value)}
                                                    className="border border-indigo-300 p-1 rounded-md w-36 focus:ring-indigo-500"
                                                    disabled={isDisabled}
                                                />
                                            ) : (
                                                service.fecha ? service.fecha.substring(0, 10) : 'N/A'
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                            {isEditing ? (
                                                <div className="flex justify-center space-x-2">
                                                    <button
                                                        onClick={handleSaveEdit}
                                                        disabled={actionLoading.save || loading}
                                                        className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:opacity-50"
                                                    >
                                                        {actionLoading.save ? "Guardando..." : "Guardar "}
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingService(null)}
                                                        disabled={actionLoading.save || loading}
                                                        className="px-3 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition disabled:opacity-50"
                                                    >
                                                        Cancelar 
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex justify-center space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(service)}
                                                        className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition disabled:opacity-50"
                                                        disabled={isDisabled}
                                                    >
                                                        Editar 
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(service.idServicio)}
                                                        disabled={isDisabled}
                                                        className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                                                    >
                                                        {isDeleting ? "Eliminando..." : "Eliminar "}
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    </div>
  );
};

export default ServiceManager;