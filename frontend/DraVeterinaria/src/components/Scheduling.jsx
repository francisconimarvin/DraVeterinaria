import React, { useState } from 'react';

const Scheduling = () => {
  const [values, setValues] = useState({
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

  // Validaciones
  const errors = {
    especie: values.especie.trim() === "" ? "La especie es obligatoria" : "",
    nombre: values.nombre.trim() === "" ? "El nombre es obligatorio" : "",
    edad: values.edad.trim() === "" ? "La edad es obligatoria"
          : isNaN(Number(values.edad)) ? "La edad debe ser un número" : "",
    antecedentes: values.antecedentes.trim() === "" ? "Debe indicar antecedentes" : ""
  };

  const isValid = (field) => !errors[field];

  const fieldClass = (field) => {
    const show = touched[field] || submitted;
    if (!show) return "border border-gray-300 rounded p-2 w-full";
    return isValid(field)
      ? "border border-green-500 rounded p-2 w-full"
      : "border border-red-500 rounded p-2 w-full";
  };

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setTouched((t) => ({ ...t, [name]: true }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (isValid("especie") && isValid("nombre") && isValid("edad") && isValid("antecedentes")) {
      alert("Mascota registrada correctamente ✅\n" + JSON.stringify(values, null, 2));
      setValues({ especie: "", nombre: "", edad: "", raza: "", antecedentes: "" });
      setTouched({ especie: false, nombre: false, edad: false, raza: false, antecedentes: false });
      setSubmitted(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-32 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Registro de Mascota</h2>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">Especie:</label>
          <select
            name="especie"
            value={values.especie}
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

        <div>
          <label className="block mb-1 font-medium">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={values.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            className={fieldClass("nombre")}
          />
          {(touched.nombre || submitted) && errors.nombre && (
            <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Edad:</label>
          <input
            type="text"
            name="edad"
            value={values.edad}
            onChange={handleChange}
            onBlur={handleBlur}
            className={fieldClass("edad")}
          />
          {(touched.edad || submitted) && errors.edad && (
            <p className="text-red-500 text-sm mt-1">{errors.edad}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Raza (opcional):</label>
          <input
            type="text"
            name="raza"
            value={values.raza}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Antecedentes:</label>
          <textarea
            name="antecedentes"
            value={values.antecedentes}
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
