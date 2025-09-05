/*
Aquí empiezo el formulario de mascotas
*/

// Seleccionamos el contenedor
const contenedor = document.getElementById("contenedorMascotas");

// Crear formulario
const form = document.createElement("form");
form.id = "formularioMascota";

// Nombre
const labelNombre = document.createElement("label");
labelNombre.textContent = "Nombre:";
const inputNombre = document.createElement("input");
inputNombre.type = "text";
inputNombre.id = "nombreMascota";
inputNombre.required = true;

// Especie (radio buttons)
const fieldsetEspecie = document.createElement("fieldset");
const legendEspecie = document.createElement("legend");
legendEspecie.textContent = "Especie:";
fieldsetEspecie.appendChild(legendEspecie);

const especies = ["Perro", "Gato"];
especies.forEach(especie => {
  const inputRadio = document.createElement("input");
  inputRadio.type = "radio";
  inputRadio.name = "especieMascota";
  inputRadio.value = especie;
  inputRadio.id = especie.toLowerCase();
  inputRadio.required = true;

  const labelRadio = document.createElement("label");
  labelRadio.setAttribute("for", especie.toLowerCase());
  labelRadio.textContent = especie;

  fieldsetEspecie.appendChild(inputRadio);
  fieldsetEspecie.appendChild(labelRadio);
  fieldsetEspecie.appendChild(document.createElement("br"));
});

// Raza
const labelRaza = document.createElement("label");
labelRaza.textContent = "Raza:";
const inputRaza = document.createElement("input");
inputRaza.type = "text";
inputRaza.id = "razaMascota";

// Sexo
const labelSexo = document.createElement("label");
labelSexo.textContent = "Sexo:";
const selectSexo = document.createElement("select");
selectSexo.id = "sexoMascota";
selectSexo.required = true;
["", "Macho", "Hembra"].forEach(opt => {
  const option = document.createElement("option");
  option.value = opt;
  option.textContent = opt === "" ? "Seleccione..." : opt;
  selectSexo.appendChild(option);
});

// Botón
const btn = document.createElement("button");
btn.type = "submit";
btn.textContent = "Registrar Mascota";

// Lista
const ulLista = document.createElement("ul");
ulLista.id = "mascotaLista";

// Agregar todos los elementos al formulario
form.appendChild(labelNombre);
form.appendChild(inputNombre);
form.appendChild(document.createElement("br"));
form.appendChild(document.createElement("br"));

form.appendChild(fieldsetEspecie);
form.appendChild(document.createElement("br"));

form.appendChild(labelRaza);
form.appendChild(inputRaza);
form.appendChild(document.createElement("br"));
form.appendChild(document.createElement("br"));

form.appendChild(labelSexo);
form.appendChild(selectSexo);
form.appendChild(document.createElement("br"));
form.appendChild(document.createElement("br"));

form.appendChild(btn);

// Agregar formulario y lista al contenedor
contenedor.appendChild(form);
contenedor.appendChild(ulLista);

// --- Lógica del formulario ---
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = inputNombre.value.trim();
  const especie = document.querySelector('input[name="especieMascota"]:checked')?.value;
  const raza = inputRaza.value.trim();
  const sexo = selectSexo.value;

  if (!nombre || !especie || !sexo) return;

  const li = document.createElement("li");
  li.textContent = `${nombre} - ${especie} (${raza}) | ${sexo}`;
  ulLista.appendChild(li);

  form.reset();
});
