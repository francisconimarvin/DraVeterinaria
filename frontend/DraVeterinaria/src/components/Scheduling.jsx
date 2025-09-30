import React, { useState } from "react";

const Scheduling = () => {
  const [mascota, setMascota] = useState({
    especie: "",
    nombre: "",
    edad: "",
    raza: "",
    antecedentes: ""
  });

  const [touched, setTouched] = useState({
    especie: false,
    nombre: false,
    edad: false,
    raza: false,
    antecedentes: false
  });

  const [submitted, setSubmitted] = useState(false);

  // Paso actual
  const [step, setStep] = useState(1);

  // Validaciones
  const errors = {
    especie: mascota.especie.trim() === "" ? "La especie es obligatoria" : "",
    nombre: mascota.nombre.trim() === "" ? "El nombre es obligatorio" : "",
    edad:
      mascota.edad.trim() === ""
        ? "La edad es obligatoria"
        : isNaN(Number(mascota.edad))
        ? "Debe ser un número"
        : "",
    antecedentes:
      mascota.antecedentes.trim() === "" ? "Indica antecedentes" : ""
  };

  const isValid = (field) => !errors[field];

  const fieldClass = (field) => {
    const show = touched[field] || submitted;
    if (!show) return "border border-gray-300 rounded p-2 w-full";
    return isValid(field)
      ? "border border-green-500 rounded p-2 w-full"
      : "border border-red-500 rounded p-2 w-full";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMascota((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (isStepValid()) {
      alert("Mascota registrada ✅\n" + JSON.stringify(mascota, null, 2));
      setMascota({ especie: "", nombre: "", edad: "", raza: "", antecedentes: "" });
      setTouched({ especie: false, nombre: false, edad: false, raza: false, antecedentes: false });
      setSubmitted(false);
    }
  };

  const isStepValid = () => {
    if (step === 1) {
      return !errors.especie && !errors.nombre && !errors.edad;
    }
    return false;
  };

  return (
    <div className="max-w-xl mx-auto mt-32 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Registro de Mascota</h2>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Especie */}
        <div>
          <label className="block mb-1 font-medium">Especie:</label>
          <select
            name="especie"
            value={mascota.especie}
            onChange={handleChange}
            onBlur={handleBlur}
            className={fieldClass("especie")}
          >
            <option value="">Selecciona especie</option>
            <option value="perro">Perro</option>
            <option value="gato">Gato</option>
          </select>
          {(touched.especie || submitted) && errors.especie && (
            <p className="text-red-500 text-sm mt-1">{errors.especie}</p>
          )}
        </div>

        {/* Nombre */}
        <div>
          <label className="block mb-1 font-medium">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={mascota.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            className={fieldClass("nombre")}
          />
          {(touched.nombre || submitted) && errors.nombre && (
            <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
          )}
        </div>

        {/* Edad */}
        <div>
          <label className="block mb-1 font-medium">Edad:</label>
          <input
            type="text"
            name="edad"
            value={mascota.edad}
            onChange={handleChange}
            onBlur={handleBlur}
            className={fieldClass("edad")}
          />
          {(touched.edad || submitted) && errors.edad && (
            <p className="text-red-500 text-sm mt-1">{errors.edad}</p>
          )}
        </div>

        {/* Raza */}
        <div>
          <label className="block mb-1 font-medium">Raza (opcional):</label>
          <input
            type="text"
            name="raza"
            value={mascota.raza}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        {/* Antecedentes */}
        <div>
          <label className="block mb-1 font-medium">Antecedentes:</label>
          <textarea
            name="antecedentes"
            value={mascota.antecedentes}
            onChange={handleChange}
            onBlur={handleBlur}
            className={fieldClass("antecedentes")}
          />
          {(touched.antecedentes || submitted) && errors.antecedentes && (
            <p className="text-red-500 text-sm mt-1">{errors.antecedentes}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Registrar Mascota
        </button>
      </form>
    </div>
  );
};

export default Scheduling;
