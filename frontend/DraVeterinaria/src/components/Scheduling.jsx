import React, { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const Scheduling = () => {
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

  const [touchedMascota, setTouchedMascota] = useState({
    especie: false,
    nombre: false,
    edad: false,
    raza: false,
    antecedentes: false
  });

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

  const [touchedTutor, setTouchedTutor] = useState({
    rut: false,
    nombre: false,
    telefono: false,
    direccion: false,
    email: false,
    confirmarEmail: false
  });

  // -----------------------------
  // Estado Servicio
  // -----------------------------
  const [servicio, setServicio] = useState({
    tipo: "",
    subtipo: "",
    precio: "",
    fecha: ""
  });

  const [touchedServicio, setTouchedServicio] = useState({
    tipo: false,
    subtipo: false,
    precio: false,
    fecha: false
  });

  // -----------------------------
  // Control de pasos y envío
  // -----------------------------
  const [step, setStep] = useState(1);
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
    subtipo: servicio.subtipo ? "" : "Debes escoger un subtipo de servicio"
  };

  // -----------------------------
  // Clases para validación
  // -----------------------------
  const fieldClass = (touchedObj, errorsObj, field) => {
    const show = touchedObj[field] || submitted;
    if (!show) return "border border-gray-300 rounded p-2 w-full";
    return errorsObj[field]
      ? "border border-red-500 rounded p-2 w-full"
      : "border border-green-500 rounded p-2 w-full";
  };

  // -----------------------------
  // Handlers de cambio y blur
  // -----------------------------
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

  const handleBlur = (touchedSetter) => (e) => {
    const { name } = e.target;
    touchedSetter((prev) => ({ ...prev, [name]: true }));
  };

  // -----------------------------
  // Submit por paso
  // -----------------------------
  const submitMascota = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const valid = !errorsMascota.especie && !errorsMascota.nombre && !errorsMascota.edad && !errorsMascota.antecedentes;
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

      // Resetear todo
      setMascota({ especie: "", nombre: "", edad: "", raza: "", antecedentes: "" });
      setTutor({ rut: "", nombre: "", telefono: "", direccion: "", email: "", confirmarEmail: "" });
      setServicio({ tipo: "", subtipo: "", precio: "", fecha: "" });
      setTouchedMascota({ especie: false, nombre: false, edad: false, raza: false, antecedentes: false });
      setTouchedTutor({ rut: false, nombre: false, telefono: false, direccion: false, email: false, confirmarEmail: false });
      setTouchedServicio({ tipo: false, subtipo: false, precio: false, fecha: false });
      setStep(1);
      setSubmitted(false);
    }
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="max-w-xl mx-auto mt-32 p-6 bg-white rounded shadow">
      {/* Paso 1 - Mascota */}
      {step === 1 && (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center">Registro de Mascota</h2>
          <form onSubmit={submitMascota} className="space-y-4" noValidate>
            <div>
              <label className="block mb-1 font-medium">Especie:</label>
              <select
                name="especie"
                value={mascota.especie}
                onChange={handleChange(setMascota, setTouchedMascota)}
                onBlur={handleBlur(setTouchedMascota)}
                className={fieldClass(touchedMascota, errorsMascota, "especie")}
              >
                <option value="">Selecciona especie</option>
                <option value="perro">Perro</option>
                <option value="gato">Gato</option>
              </select>
              {(touchedMascota.especie || submitted) && errorsMascota.especie && (
                <p className="text-red-500 text-sm mt-1">{errorsMascota.especie}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={mascota.nombre}
                onChange={handleChange(setMascota, setTouchedMascota)}
                onBlur={handleBlur(setTouchedMascota)}
                className={fieldClass(touchedMascota, errorsMascota, "nombre")}
              />
              {(touchedMascota.nombre || submitted) && errorsMascota.nombre && (
                <p className="text-red-500 text-sm mt-1">{errorsMascota.nombre}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Edad:</label>
              <input
                type="text"
                name="edad"
                value={mascota.edad}
                onChange={handleChange(setMascota, setTouchedMascota)}
                onBlur={handleBlur(setTouchedMascota)}
                className={fieldClass(touchedMascota, errorsMascota, "edad")}
              />
              {(touchedMascota.edad || submitted) && errorsMascota.edad && (
                <p className="text-red-500 text-sm mt-1">{errorsMascota.edad}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Raza (opcional):</label>
              <input
                type="text"
                name="raza"
                value={mascota.raza}
                onChange={handleChange(setMascota, setTouchedMascota)}
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Antecedentes:</label>
              <textarea
                name="antecedentes"
                value={mascota.antecedentes}
                onChange={handleChange(setMascota, setTouchedMascota)}
                onBlur={handleBlur(setTouchedMascota)}
                className={fieldClass(touchedMascota, errorsMascota, "antecedentes")}
              />
              {(touchedMascota.antecedentes || submitted) && errorsMascota.antecedentes && (
                <p className="text-red-500 text-sm mt-1">{errorsMascota.antecedentes}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Siguiente
            </button>
          </form>
        </>
      )}

      {/* Paso 2 - Tutor */}
      {step === 2 && (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center">Registro de Tutor</h2>
          <form onSubmit={submitTutor} className="space-y-4" noValidate>
            {["rut", "nombre", "telefono", "direccion", "email", "confirmarEmail"].map((field) => (
              <div key={field}>
                <label className="block mb-1 font-medium">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace("confirmarEmail","Confirmar Email")}:
                </label>
                <input
                  type={field.includes("email") ? "email" : "text"}
                  name={field}
                  value={tutor[field]}
                  onChange={handleChange(setTutor, setTouchedTutor)}
                  onBlur={handleBlur(setTouchedTutor)}
                  className={fieldClass(touchedTutor, errorsTutor, field)}
                />
                {(touchedTutor[field] || submitted) && errorsTutor[field] && (
                  <p className="text-red-500 text-sm mt-1">{errorsTutor[field]}</p>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Siguiente
            </button>
          </form>
        </>
      )}

      {/* Paso 3 - Servicio */}
      {step === 3 && (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center">Registro de Servicio</h2>
          <form onSubmit={submitServicio} className="space-y-4" noValidate>
            <div>
              <label className="block mb-1 font-medium">Tipo de Servicio:</label>
              <select
                name="tipo"
                value={servicio.tipo}
                onChange={handleChangeServicio}
                onBlur={handleBlur(setTouchedServicio)}
                className={fieldClass(touchedServicio, errorsServicio, "tipo")}
              >
                <option value="">Selecciona tipo</option>
                {Object.keys(serviciosOpciones).map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                  </option>
                ))}
              </select>
              {(touchedServicio.tipo || submitted) && errorsServicio.tipo && (
                <p className="text-red-500 text-sm mt-1">{errorsServicio.tipo}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Subtipo:</label>
              <select
                name="subtipo"
                value={servicio.subtipo}
                onChange={handleChangeServicio}
                onBlur={handleBlur(setTouchedServicio)}
                className={fieldClass(touchedServicio, errorsServicio, "subtipo")}
                disabled={!servicio.tipo}
              >
                <option value="">Selecciona subtipo</option>
                {servicio.tipo &&
                  serviciosOpciones[servicio.tipo].map((s) => (
                    <option key={s.subtipo} value={s.subtipo}>
                      {s.subtipo} - ${s.precio}
                    </option>
                  ))}
              </select>
              {(touchedServicio.subtipo || submitted) && errorsServicio.subtipo && (
                <p className="text-red-500 text-sm mt-1">{errorsServicio.subtipo}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Precio:</label>
              <input
                type="text"
                name="precio"
                value={servicio.precio}
                readOnly
                className="border border-gray-300 rounded p-2 w-full bg-gray-100"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Fecha:</label>
              <input
                type="date"
                name="fecha"
                value={servicio.fecha}
                onChange={handleChange(setServicio, setTouchedServicio)}
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Finalizar Registro
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Scheduling;
