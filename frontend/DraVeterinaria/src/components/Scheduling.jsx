import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const Scheduling = () => {
  const [step, setStep] = useState(1); 
  const totalSteps = 3;
  // -----------------------------
  // Estado Mascota
  // -----------------------------
  const [mascota, setMascota] = useState({
    especie: "",
    nombre: "",
    edad: "",
    raza: "",
    antecedentes: ""
  });

  const [touchedMascota, setTouchedMascota] = useState({});

  // -----------------------------
  // Estado Tutor
  // -----------------------------
  const [tutor, setTutor] = useState({
    rut: "",
    nombre: "",
    telefono: "",
    direccion: "",
    email: "",
    confirmarEmail: ""
  });

  const [touchedTutor, setTouchedTutor] = useState({});

  // -----------------------------
  // Estado Servicio
  // -----------------------------
  const [servicio, setServicio] = useState({
    tipo: "",
    subtipo: "",
    precio: "",
    fecha: ""
  });

  const [touchedServicio, setTouchedServicio] = useState({});

  // -----------------------------
  // Control envío
  // -----------------------------
  const [submitted, setSubmitted] = useState(false);

  // -----------------------------
  // Opciones de servicios
  // -----------------------------
  const serviciosOpciones = {
    vacuna: [
      { subtipo: "Rabia", precio: 20000 },
      { subtipo: "Parvovirus", precio: 18000 },
      { subtipo: "Gripe Canina", precio: 22000 }
    ],
    certificado: [
      { subtipo: "Viaje Nacional", precio: 10000 },
      { subtipo: "Viaje Internacional", precio: 25000 }
    ],
    microchip: [
      { subtipo: "Microchip Simple", precio: 15000 },
      { subtipo: "Microchip con Registro", precio: 20000 }
    ],
    consulta: [
      { subtipo: "General", precio: 12000 },
      { subtipo: "Especializada", precio: 20000 }
    ]
  };

  // -----------------------------
  // Validaciones
  // -----------------------------
  const errorsMascota = {
    especie: mascota.especie.trim() === "" ? "La especie es obligatoria" : "",
    nombre: mascota.nombre.trim() === "" ? "El nombre es obligatorio" : "",
    edad:
      mascota.edad.trim() === ""
        ? "La edad es obligatoria"
        : isNaN(Number(mascota.edad))
        ? "Debe ser un número"
        : "",
    raza: mascota.raza.trim() === "" ? "La raza es obligatoria" : "",
    antecedentes: mascota.antecedentes.trim() === "" ? "Indica antecedentes" : ""
  };

  const errorsTutor = {
    rut:
      tutor.rut.trim() === ""
        ? "El rut es obligatorio"
        : !/^\d{7,8}-[0-9kK]$/.test(tutor.rut)
        ? "Formato incorrecto. Ej: 12345667-1"
        : "",
    nombre: tutor.nombre.trim() === "" ? "El nombre es obligatorio" : "",
    telefono:
      tutor.telefono.trim() === ""
        ? "El número de teléfono es obligatorio"
        : isNaN(Number(tutor.telefono))
        ? "Debe ser un número"
        : tutor.telefono.length !== 9
        ? "El número debe tener 9 dígitos. Ej: 912345678"
        : "",
    direccion: tutor.direccion.trim() === "" ? "Debes agregar una dirección" : "",
    email:
      tutor.email.trim() === ""
        ? "El email es obligatorio"
        : !EMAIL_RE.test(tutor.email)
        ? "Formato de email inválido."
        : "",
    confirmarEmail:
      tutor.confirmarEmail.trim() === ""
        ? "Debes confirmar el email"
        : tutor.email !== tutor.confirmarEmail
        ? "El email debe coincidir."
        : ""
  };

  const errorsServicio = {
    tipo: servicio.tipo ? "" : "Debes escoger un tipo de servicio",
    subtipo: servicio.subtipo ? "" : "Debes escoger un subtipo de servicio",
    fecha: servicio.fecha ? "" : "Debes seleccionar una fecha"
  };

  // -----------------------------
  // Helpers
  // -----------------------------
  const fieldClass = (touchedObj, errorsObj, field) => {
    const show = touchedObj[field] || submitted;
    if (!show) return "border border-gray-300 rounded p-2 w-full";
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
        newState.subtipo = "";
        newState.precio = "";
      }
      if (name === "subtipo" && newState.tipo) {
        const precioObj = serviciosOpciones[newState.tipo].find((s) => s.subtipo === value);
        newState.precio = precioObj ? precioObj.precio : "";
      }
      return newState;
    });
    setTouchedServicio((prev) => ({ ...prev, [name]: true }));
  };

  // -----------------------------
  // Submit + Avance
  // -----------------------------
  const submitMascota = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const valid = Object.values(errorsMascota).every((err) => !err);
    if (valid) {
      setStep(2);
      setSubmitted(false);
    }
  };

  const submitTutor = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const valid = Object.values(errorsTutor).every((err) => !err);
    if (valid) {
      setStep(3);
      setSubmitted(false);
    }
  };

  const submitServicio = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const valid = Object.values(errorsServicio).every((err) => !err);
    if (valid) {
      alert(
        "Registro completo ✅\n" +
          JSON.stringify({ mascota, tutor, servicio }, null, 2)
      );
     // Acá dejo los campos vacíos al hacer submit 
    setMascota({ especie: "", nombre: "", edad: "", raza: "", antecedentes: "" });
    setTouchedMascota({});

    setTutor({ rut: "", nombre: "", telefono: "", direccion: "", email: "", confirmarEmail: "" });
    setTouchedTutor({});

    setServicio({ tipo: "", subtipo: "", precio: "", fecha: "" });
    setTouchedServicio({});

    setSubmitted(false);
    setStep(1); // reinicia el flujo
    }
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="max-w-xl mx-auto mt-10 py-38 bg-white rounded shadow">
      <ProgressBar step={step} totalSteps={totalSteps} />
      {/* Paso 1 - Mascota */}
      {step === 1 && (
        <form onSubmit={submitMascota} className="space-y-4" noValidate>
          <h2 className="text-2xl font-bold mb-6 text-center">Registro de Mascota</h2>

          <input type="text" name="especie" placeholder="Especie"
            value={mascota.especie} onChange={handleChange(setMascota, setTouchedMascota)}
            className={fieldClass(touchedMascota, errorsMascota, "especie")} />
          {errorsMascota.especie && (touchedMascota.especie || submitted) && (
            <p className="text-red-500 text-sm">{errorsMascota.especie}</p>
          )}

          <input type="text" name="nombre" placeholder="Nombre"
            value={mascota.nombre} onChange={handleChange(setMascota, setTouchedMascota)}
            className={fieldClass(touchedMascota, errorsMascota, "nombre")} />
          {errorsMascota.nombre && (touchedMascota.nombre || submitted) && (
            <p className="text-red-500 text-sm">{errorsMascota.nombre}</p>
          )}

          <input type="text" name="edad" placeholder="Edad"
            value={mascota.edad} onChange={handleChange(setMascota, setTouchedMascota)}
            className={fieldClass(touchedMascota, errorsMascota, "edad")} />
          {errorsMascota.edad && (touchedMascota.edad || submitted) && (
            <p className="text-red-500 text-sm">{errorsMascota.edad}</p>
          )}

          <input type="text" name="raza" placeholder="Raza"
            value={mascota.raza} onChange={handleChange(setMascota, setTouchedMascota)}
            className={fieldClass(touchedMascota, errorsMascota, "raza")} />
          {errorsMascota.raza && (touchedMascota.raza || submitted) && (
            <p className="text-red-500 text-sm">{errorsMascota.raza}</p>
          )}

          <textarea name="antecedentes" placeholder="Antecedentes médicos"
            value={mascota.antecedentes} onChange={handleChange(setMascota, setTouchedMascota)}
            className={fieldClass(touchedMascota, errorsMascota, "antecedentes")} />
          {errorsMascota.antecedentes && (touchedMascota.antecedentes || submitted) && (
            <p className="text-red-500 text-sm">{errorsMascota.antecedentes}</p>
          )}

          <div className="flex justify-end">
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
              Siguiente
            </button>
          </div>
        </form>
      )}

      {/* Paso 2 - Tutor */}
      {step === 2 && (
        <form onSubmit={submitTutor} className="space-y-4" noValidate>
          <h2 className="text-2xl font-bold mb-6 text-center">Registro de Tutor</h2>

          <input type="text" name="rut" placeholder="RUT"
            value={tutor.rut} onChange={handleChange(setTutor, setTouchedTutor)}
            className={fieldClass(touchedTutor, errorsTutor, "rut")} />
          {errorsTutor.rut && (touchedTutor.rut || submitted) && (
            <p className="text-red-500 text-sm">{errorsTutor.rut}</p>
          )}

          <input type="text" name="nombre" placeholder="Nombre"
            value={tutor.nombre} onChange={handleChange(setTutor, setTouchedTutor)}
            className={fieldClass(touchedTutor, errorsTutor, "nombre")} />
          {errorsTutor.nombre && (touchedTutor.nombre || submitted) && (
            <p className="text-red-500 text-sm">{errorsTutor.nombre}</p>
          )}

          <input type="text" name="telefono" placeholder="Teléfono (9 dígitos)"
            value={tutor.telefono} onChange={handleChange(setTutor, setTouchedTutor)}
            className={fieldClass(touchedTutor, errorsTutor, "telefono")} />
          {errorsTutor.telefono && (touchedTutor.telefono || submitted) && (
            <p className="text-red-500 text-sm">{errorsTutor.telefono}</p>
          )}

          <input type="text" name="direccion" placeholder="Dirección"
            value={tutor.direccion} onChange={handleChange(setTutor, setTouchedTutor)}
            className={fieldClass(touchedTutor, errorsTutor, "direccion")} />
          {errorsTutor.direccion && (touchedTutor.direccion || submitted) && (
            <p className="text-red-500 text-sm">{errorsTutor.direccion}</p>
          )}

          <input type="email" name="email" placeholder="Correo"
            value={tutor.email} onChange={handleChange(setTutor, setTouchedTutor)}
            className={fieldClass(touchedTutor, errorsTutor, "email")} />
          {errorsTutor.email && (touchedTutor.email || submitted) && (
            <p className="text-red-500 text-sm">{errorsTutor.email}</p>
          )}

          <input type="email" name="confirmarEmail" placeholder="Confirmar correo"
            value={tutor.confirmarEmail} onChange={handleChange(setTutor, setTouchedTutor)}
            className={fieldClass(touchedTutor, errorsTutor, "confirmarEmail")} />
          {errorsTutor.confirmarEmail && (touchedTutor.confirmarEmail || submitted) && (
            <p className="text-red-500 text-sm">{errorsTutor.confirmarEmail}</p>
          )}

          <div className="flex justify-between">
            <button type="button" onClick={() => setStep(1)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Atrás
            </button>
            <button type="submit" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">
              Siguiente
            </button>
          </div>
        </form>
      )}

      {/* Paso 3 - Servicio */}
      {step === 3 && (
        <form onSubmit={submitServicio} className="space-y-4" noValidate>
          <h2 className="text-2xl font-bold mb-6 text-center">Registro de Servicio</h2>

          <select name="tipo" value={servicio.tipo} onChange={handleChangeServicio}
            className={fieldClass(touchedServicio, errorsServicio, "tipo")}>
            <option value="">Seleccionar servicio</option>
            {Object.keys(serviciosOpciones).map((tipo) => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>
          {errorsServicio.tipo && (touchedServicio.tipo || submitted) && (
            <p className="text-red-500 text-sm">{errorsServicio.tipo}</p>
          )}

          {servicio.tipo && (
            <select name="subtipo" value={servicio.subtipo} onChange={handleChangeServicio}
              className={fieldClass(touchedServicio, errorsServicio, "subtipo")}>
              <option value="">Seleccionar subtipo</option>
              {serviciosOpciones[servicio.tipo].map((s) => (
                <option key={s.subtipo} value={s.subtipo}>{s.subtipo} - ${s.precio}</option>
              ))}
            </select>
          )}
          {errorsServicio.subtipo && (touchedServicio.subtipo || submitted) && (
            <p className="text-red-500 text-sm">{errorsServicio.subtipo}</p>
          )}

          <input type="date" name="fecha" value={servicio.fecha} onChange={handleChangeServicio}
            className={fieldClass(touchedServicio, errorsServicio, "fecha")} />
          {errorsServicio.fecha && (touchedServicio.fecha || submitted) && (
            <p className="text-red-500 text-sm">{errorsServicio.fecha}</p>
          )}

          {servicio.precio && (
            <p className="text-lg font-semibold text-center">Precio: ${servicio.precio}</p>
          )}

          <div className="flex justify-between">
            <button type="button" onClick={() => setStep(2)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Atrás
            </button>
            <button type="submit" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded">
              Finalizar Registro
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Scheduling;
