import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";

// Regex para email
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const Scheduling = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  // -----------------------------
  // Estado Mascota, Tutor, y Servicio (sin cambios en su estructura)
  // -----------------------------
  const [mascota, setMascota] = useState({
    especie: "",
    nombre: "",
    fechaNacimiento: "",
    raza: "",
    sexo: "",
    antecedentes: ""
  });
  const [touchedMascota, setTouchedMascota] = useState({});

  const [tutor, setTutor] = useState({
    rut: "",
    nombre: "",
    snombre:"",
    apaterno:"",
    amaterno:"",
    telefono: "",
    direccion: "",
    email: "",
    confirmarEmail: ""
  });
  const [touchedTutor, setTouchedTutor] = useState({});

  const [servicio, setServicio] = useState({
    tipo: "", // idTipoServicio
    subtipo: "", // idSubtipoServicio
    precio: "",
    fecha: ""
  });
  const [touchedServicio, setTouchedServicio] = useState({});

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Estados para datos de API (Tipos, Especies y Subtipos)
  // -----------------------------
  const [tiposServicio, setTiposServicio] = useState([]);
  const [especies, setEspecies] = useState([]);
  const [subtiposServicio, setSubtiposServicio] = useState([]);

  // -----------------------------
  // Efectos para cargar datos iniciales (Tipos y Especies)
  // -----------------------------
  useEffect(() => {
    // Carga Tipos de Servicio
    fetch("http://localhost:8090/api/tipos-servicio")
      .then(res => res.json())
      .then(data => setTiposServicio(data))
      .catch(error => console.error("Error fetching tipos de servicio:", error));
    // Carga Especies
    fetch("http://localhost:8090/api/especies")
      .then(res => res.json())
      .then(data => setEspecies(data))
      .catch(error => console.error("Error fetch especies:", error));
  }, []);


  useEffect(() => {
    
    if (!servicio.tipo) {
      setSubtiposServicio([]);
      return;
    }

    
    const idTipo = servicio.tipo; 
    setLoading(true);

    fetch(`http://localhost:8090/api/subtipos-servicio/tipo/${idTipo}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Error al cargar subtipos');
        }
        return res.json();
      })
      .then(data => {
        setSubtiposServicio(data);
      })
      .catch(error => {
        console.error("Error fetching subtipos de servicio:", error);
        setSubtiposServicio([]); // Limpiar subtipos en caso de error
      })
      .finally(() => {
        setLoading(false);
      });
  }, [servicio.tipo]); // Ejecutar cuando cambia el tipo de servicio


  const errorsMascota = {
    especie: mascota.especie.trim() === "" ? "La especie es obligatoria" : "",
    nombre: mascota.nombre.trim() === "" ? "El nombre es obligatorio" : "",
    fechaNacimiento:
      mascota.fechaNacimiento.trim() === ""
        ? "La fecha de nacimiento es obligatoria"
        : new Date(mascota.fechaNacimiento) > new Date()
        ? "La fecha no puede ser futura"
        : "",
    raza: mascota.raza.trim() === "" ? "La raza es obligatoria" : "",
    sexo: mascota.sexo.trim() === "" ? "El sexo es obligatorio" : "",
    antecedentes: 
      mascota.antecedentes.trim() === "" ? "Indica antecedentes" : ""
  };

  const errorsTutor = {
    rut:
      tutor.rut.trim() === ""
        ? "El rut es obligatorio"
        : !/^\d{7,8}-[0-9kK]$/.test(tutor.rut)
        ? "Formato incorrecto. Ej: 12345667-1"
        : "",
    nombre: tutor.nombre.trim() === "" ? "El nombre es obligatorio" : "",
    apaterno: tutor.apaterno.trim() === "" ? "El apellido es obligatorio" : "",
    telefono:
      tutor.telefono.trim() === ""
        ? "El número de teléfono es obligatorio"
        : isNaN(Number(tutor.telefono))
        ? "Debe ser un número"
        : tutor.telefono.length !== 9
        ? "Debe tener 9 dígitos"
        : "",
    direccion:
      tutor.direccion.trim() === "" ? "Debes agregar una dirección" : "",
    email:
      tutor.email.trim() === ""
        ? "El email es obligatorio"
        : !EMAIL_RE.test(tutor.email)
        ? "Formato de email inválido"
        : "",
    confirmarEmail:
      tutor.confirmarEmail.trim() === ""
        ? "Debes confirmar el email"
        : tutor.email !== tutor.confirmarEmail
        ? "El email debe coincidir"
        : ""
  };
  
  const errorsServicio = {
    tipo: servicio.tipo ? "" : "Debes escoger un tipo de servicio",
    subtipo: servicio.subtipo ? "" : "Debes escoger un subtipo", 
    fecha: servicio.fecha ? "" : "Debes elegir la fecha"
  };


  // -----------------------------
  // Helpers
  // -----------------------------
  const fieldClass = (touchedObj, errorsObj, field) => {
    const show = touchedObj[field] || submitted;
    if (!show)
      return "border border-gray-300 rounded p-2 w-full";
    return errorsObj[field]
      ? "border border-red-500 rounded p-2 w-full"
      : "border border-green-500 rounded p-2 w-full";
  };

  const handleChange = (stateSetter, touchedSetter) => (e) => {
    const { name, value } = e.target;
    stateSetter((prev) => ({ ...prev, [name]: value }));
    touchedSetter((prev) => ({ ...prev, [name]: true }));
  };


  const handleChangeServicio = (e) => {
    const { name, value } = e.target;

    setServicio((prev) => {
      const newState = { ...prev, [name]: value };

      if (name === "tipo") {
        // Al cambiar el tipo, resetear subtipo y precio
        newState.subtipo = "";
        newState.precio = "";
      }

      if (name === "subtipo" && newState.tipo) {
        const precioObj = subtiposServicio.find(
          (s) => String(s.idSubtipo) === value
        );
        newState.precio = precioObj ? precioObj.precio : ""; 
      }
      return newState;
    });

    setTouchedServicio((prev) => ({ ...prev, [name]: true }));
  };


  // -----------------------------
  // SUBMIT FINAL - INTEGRADO A BACKEND
  // -----------------------------
  const submitServicio = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const valid = Object.values(errorsServicio).every((e) => !e);
    if (!valid) return;

    try {
      setLoading(true);

      
      // 1. Registrar tutor
      const tutorRes = await fetch("http://localhost:8090/api/tutores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          runTutor: tutor.rut.split("-")[0],
          dvRun: tutor.rut.split("-")[1],
          nombreTutor: tutor.nombre,
          snombreTutor:tutor.snombre,
          apPaternoTutor:tutor.apaterno,
          aMaternoTutor:tutor.amaterno,
          telefono: tutor.telefono,
          direccion: tutor.direccion,
          email: tutor.email
        })
      });

      const tutorData = await tutorRes.json();

      // 2. Registrar mascota
      const mascotaRes = await fetch("http://localhost:8090/api/mascotas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombreMascota: mascota.nombre,
          fechaNacimiento: mascota.fechaNacimiento, // Usar fechaNacimiento del estado
          sexo: mascota.sexo, 
          especie: { idEspecie: mascota.especie },
          raza: mascota.raza, 
          antecedentes: mascota.antecedentes, 
          tutor: { idTutor: tutorData.idTutor }
        })
      });

      const mascotaData = await mascotaRes.json();
      
      // 3. Registrar servicio
      await fetch("http://localhost:8090/api/servicios/servicios", { // 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mascota: { idMascota: mascotaData.idMascota },               
          subtipo: { idSubtipo: servicio.subtipo }, 
          costo: servicio.precio,
          fecha: `${servicio.fecha}T10:00:00`
          
       
        })
      });

      alert("Registro completado con éxito ");

      // ... [Lógica de reinicio de estados] ...
      setMascota({
        especie: "",
        nombre: "",
        fechaNacimiento: "",
        raza: "",
        sexo:"",
        antecedentes: ""
      });
      setTutor({
        rut: "",
        nombre: "",
        snombre:"",
        apaterno:"",
        amaterno:"",
        telefono: "",
        direccion: "",
        email: "",
        confirmarEmail: ""
      });
      setServicio({
        tipo: "",
        subtipo: "",
        precio: "",
        fecha: ""
      });
      setSubtiposServicio([]); // Limpiar subtipos
      setTouchedMascota({});
      setTouchedTutor({});
      setTouchedServicio({});
      
      setStep(1);
      setSubmitted(false);
      
    } catch (error) {
      console.error(error);
      alert("Error al registrar. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Submit Mascota + Tutor 
  // -----------------------------
  const submitMascota = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const valid = Object.values(errorsMascota).every((e) => !e);
    if (valid) {
      setStep(2);
      setSubmitted(false);
    }
  };

  const submitTutor = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const valid = Object.values(errorsTutor).every((e) => !e);
    if (valid) {
      setStep(3);
      setSubmitted(false);
    }
  };

 
  return (
    <div className="max-w-xl mx-auto mt-10 py-8 bg-white rounded shadow">
      
      <ProgressBar step={step} totalSteps={totalSteps} />

      {/* PASO 1  */}
      {step === 1 && (
        <div className="px-6">
        <form onSubmit={submitMascota} className="space-y-4">
          
           <h2 className="text-2xl font-bold text-center mb-6">Registro Mascota</h2>

            <select
              name="especie"
              value={mascota.especie}
              onChange={handleChange(setMascota, setTouchedMascota)}
              className={fieldClass(touchedMascota, errorsMascota, "especie")}
              >
              <option value="">Seleccionar especie</option>
              {especies.map(e => (
                  <option key={e.idEspecie} value={e.idEspecie}>
                  {e.nombreEspecie}
                  </option>
              ))}
            </select>

            
            {(touchedMascota.especie || submitted) && errorsMascota.especie && (
            <p className="text-red-500 text-sm">{errorsMascota.especie}</p>
            )}

            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={mascota.nombre}
              onChange={handleChange(setMascota, setTouchedMascota)}
              className={fieldClass(touchedMascota, errorsMascota, "nombre")}
            />

            {(touchedMascota.nombre || submitted) && errorsMascota.nombre && (
              <p className="text-red-500 text-sm">{errorsMascota.nombre}</p>
            )}

          <label className="font-semibold">Fecha de nacimiento</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={mascota.fechaNacimiento}
              onChange={handleChange(setMascota, setTouchedMascota)}
              className={fieldClass(touchedMascota, errorsMascota, "fechaNacimiento")}
              />
              {(touchedMascota.fechaNacimiento || submitted) && errorsMascota.fechaNacimiento && (
              <p className="text-red-500 text-sm">{errorsMascota.fechaNacimiento}</p>
            )}


            <input
              type="text"
              name="raza"
              placeholder="Raza"
              value={mascota.raza}
              onChange={handleChange(setMascota, setTouchedMascota)}
              className={fieldClass(touchedMascota, errorsMascota, "raza")}
            />
            {(touchedMascota.raza || submitted) && errorsMascota.raza && (
              <p className="text-red-500 text-sm">{errorsMascota.raza}</p>
            )}

          <div className="flex flex-col gap-2">
              <label className="font-semibold">Sexo</label>
              <div className="flex gap-3">
                  <button
                  type="button"
                  onClick={() =>
                      setMascota({ ...mascota, sexo: "M" }) ||
                      setTouchedMascota({ ...touchedMascota, sexo: true })
                  }
                  className={`px-4 py-2 rounded border 
                      ${mascota.sexo === "M" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
                  >
                  Macho
                  </button>

                  <button
                  type="button"
                  onClick={() =>
                      setMascota({ ...mascota, sexo: "H" }) ||
                      setTouchedMascota({ ...touchedMascota, sexo: true })
                  }
                  className={`px-4 py-2 rounded border
                      ${mascota.sexo === "H" ? "bg-pink-600 text-white" : "bg-gray-100"}`}
                  >
                  Hembra
                  </button>
              </div>
              {(touchedMascota.sexo || submitted) && errorsMascota.sexo && (
                  <p className="text-red-500 text-sm">{errorsMascota.sexo}</p>
              )}
              </div>

            <textarea
              name="antecedentes"
              placeholder="Antecedentes"
              value={mascota.antecedentes}
              onChange={handleChange(setMascota, setTouchedMascota)}
              className={fieldClass(
                touchedMascota,
                errorsMascota,
                "antecedentes"
              )}
            />
            {(touchedMascota.antecedentes || submitted) &&errorsMascota.antecedentes && (
              <p className="text-red-500 text-sm">{errorsMascota.antecedentes}</p>
            )}

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded w-full"
            >
              Siguiente
            </button>
        </form>
        </div>
      )}

      {/* PASO 2  */}
      {step === 2 && (
        <div className="px-6">
        <form onSubmit={submitTutor} className="space-y-4">
          <h2 className="text-2xl font-bold text-center mb-6">Registro Tutor</h2>
            <input
              type="text"
              name="rut"
              placeholder="RUT"
              value={tutor.rut}
              onChange={handleChange(setTutor, setTouchedTutor)}
              className={fieldClass(touchedTutor, errorsTutor, "rut")}
            />
            {(touchedTutor.rut|| submitted) && errorsTutor.rut && (
              <p className="text-red-500 text-sm">{errorsTutor.rut}</p>
            )}

            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={tutor.nombre}
              onChange={handleChange(setTutor, setTouchedTutor)}
              className={fieldClass(touchedTutor, errorsTutor, "nombre")}
            />
            {(touchedTutor.nombre|| submitted) &&errorsTutor.nombre && (
              <p className="text-red-500 text-sm">{errorsTutor.nombre}</p>
            )}

            <input
              type="text"
              name="snombre"
              placeholder="Segundo Nombre (OPCIONAL)"
              value={tutor.snombre}
              onChange={handleChange(setTutor, setTouchedTutor)}
              className={fieldClass(touchedTutor, errorsTutor, "snombre")}
            />
            {(touchedTutor.snombre|| submitted) &&errorsTutor.snombre && (
              <p className="text-red-500 text-sm">{errorsTutor.snombre}</p>
            )}

            <input
              type="text"
              name="apaterno"
              placeholder="Apellido Paterno"
              value={tutor.apaterno}
              onChange={handleChange(setTutor, setTouchedTutor)}
              className={fieldClass(touchedTutor, errorsTutor, "apaterno")}
            />
            {(touchedTutor.apaterno|| submitted) &&errorsTutor.apaterno && (
              <p className="text-red-500 text-sm">{errorsTutor.apaterno}</p>
            )}

            <input
              type="text"
              name="amaterno"
              placeholder="Apellido Materno (OPCIONAL)"
              value={tutor.amaterno}
              onChange={handleChange(setTutor, setTouchedTutor)}
              className={fieldClass(touchedTutor, errorsTutor, "amaterno")}
            />
            {(touchedTutor.amaterno|| submitted) &&errorsTutor.amaterno && (
              <p className="text-red-500 text-sm">{errorsTutor.amaterno}</p>
            )}


            <input
              type="text"
              name="telefono"
              placeholder="Teléfono"
              value={tutor.telefono}
              onChange={handleChange(setTutor, setTouchedTutor)}
              className={fieldClass(touchedTutor, errorsTutor, "telefono")}
            />
            {(touchedTutor.telefono|| submitted) && errorsTutor.telefono && (
              <p className="text-red-500 text-sm">{errorsTutor.telefono}</p>
            )}

            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={tutor.direccion}
              onChange={handleChange(setTutor, setTouchedTutor)}
              className={fieldClass(touchedTutor, errorsTutor, "direccion")}
            />
            {(touchedTutor.direccion|| submitted) &&errorsTutor.direccion && (
              <p className="text-red-500 text-sm">{errorsTutor.direccion}</p>
            )}

            <input
              type="email"
              name="email"
              placeholder="Correo"
              value={tutor.email}
              onChange={handleChange(setTutor, setTouchedTutor)}
              className={fieldClass(touchedTutor, errorsTutor, "email")}
            />
            {(touchedTutor.email || submitted) &&errorsTutor.email && (
              <p className="text-red-500 text-sm">{errorsTutor.email}</p>
            )}

            <input
              type="email"
              name="confirmarEmail"
              placeholder="Confirmar correo"
              value={tutor.confirmarEmail}
              onChange={handleChange(setTutor, setTouchedTutor)}
              className={fieldClass(
                touchedTutor,
                errorsTutor,
                "confirmarEmail"
              )}
            />
            {(touchedTutor.confirmarEmail|| submitted) &&errorsTutor.confirmarEmail && (
              <p className="text-red-500 text-sm">
                {errorsTutor.confirmarEmail}
              </p>
            )}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Atrás
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Siguiente
              </button>
            </div>
        </form>
        </div>
      )}

      {/* PASO 3 */}
      {step === 3 && (
        <div className="px-6">
        <form onSubmit={submitServicio} className="space-y-4">
          <h2 className="text-2xl font-bold text-center mb-6">Servicio</h2>

          <select
          name="tipo"
          value={servicio.tipo}
          onChange={handleChangeServicio}
          className={fieldClass(touchedServicio, errorsServicio, "tipo")}
        >
          <option value="">Seleccionar servicio</option>
          {tiposServicio.map((t) => (
            <option key={t.idTipo} value={t.idTipo}>
              {t.tipoServicio}
            </option>
          ))}
        </select>

          {(touchedServicio.tipo|| submitted) && errorsServicio.tipo && (
            <p className="text-red-500 text-sm">{errorsServicio.tipo}</p>
          )}

          {servicio.tipo && (
            <select
              name="subtipo"
              value={servicio.subtipo}
              onChange={handleChangeServicio}
              className={fieldClass(
                touchedServicio,
                errorsServicio,
                "subtipo"
              )}
            >
              <option value="">Seleccionar subtipo</option>
              {loading ? (
                <option disabled>Cargando subtipos...</option>
              ) : subtiposServicio.length > 0 ? (

                subtiposServicio.map((s) => (

                  <option key={s.idSubtipo} value={s.idSubtipo}>
                    {s.nombreSubtipo} - ${s.precio}
                  </option>
                ))
              ) : (
                <option disabled>No hay subtipos disponibles</option>
              )}
            </select>
          )}
          
          {(touchedServicio.subtipo || submitted) &&errorsServicio.subtipo && (
            <p className="text-red-500 text-sm">{errorsServicio.subtipo}</p>
          )}

          <input
            type="date"
            name="fecha"
            value={servicio.fecha}
            onChange={handleChangeServicio}
            className={fieldClass(touchedServicio, errorsServicio, "fecha")}
          />
          {(touchedServicio.fecha || submitted) &&errorsServicio.fecha && (
            <p className="text-red-500 text-sm">{errorsServicio.fecha}</p>
          )}

          {servicio.precio && (
            <p className="text-lg text-center font-bold">
              Precio: ${servicio.precio}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-purple-600 text-white rounded w-full"
          >
            {loading ? "Registrando..." : "Finalizar Registro"}
          </button>
        </form>
        </div>
      )}
    </div>
  );
};

export default Scheduling;