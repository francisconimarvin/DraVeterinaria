/* FORMULARIO DE MASCOTAS */

// Seleccionamos el contenedor
const contenedor = document.getElementById("contenedorMascotas");

// Crear formulario
const form = document.createElement("form");
form.id = "formularioMascota";

// --- Nombre ---
const labelNombre = document.createElement("label");
labelNombre.textContent = "Nombre:";
labelNombre.setAttribute("for", "nombreMascota");

const inputNombre = document.createElement("input");
inputNombre.type = "text";
inputNombre.id = "nombreMascota";
inputNombre.required = true;

// Mensaje de error
const errorNombre = document.createElement("small");
errorNombre.style.color = "red";

// --- Especie (radio buttons) ---
const fieldsetEspecie = document.createElement("fieldset");
const legendEspecie = document.createElement("legend");
legendEspecie.textContent = "Especie:";
fieldsetEspecie.appendChild(legendEspecie);

const especies = ["Perro", "Gato"];
const errorEspecie = document.createElement("small");
errorEspecie.style.color = "red";

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
fieldsetEspecie.appendChild(errorEspecie);

// --- Raza ---
const labelRaza = document.createElement("label");
labelRaza.textContent = "Raza:";
labelRaza.setAttribute("for", "razaMascota");

const inputRaza = document.createElement("input");
inputRaza.type = "text";
inputRaza.id = "razaMascota";
inputRaza.required = true; // <-- obligatorio

// Mensaje de error raza
const errorRaza = document.createElement("small");
errorRaza.style.color = "red";

// --- Sexo ---
const labelSexo = document.createElement("label");
labelSexo.textContent = "Sexo:";
labelSexo.setAttribute("for", "sexoMascota");

const selectSexo = document.createElement("select");
selectSexo.id = "sexoMascota";
selectSexo.required = true;

const errorSexo = document.createElement("small");
errorSexo.style.color = "red";

["", "Macho", "Hembra"].forEach(opt => {
  const option = document.createElement("option");
  option.value = opt;
  option.textContent = opt === "" ? "Seleccione..." : opt;
  selectSexo.appendChild(option);
});

// --- Botón ---
const btn = document.createElement("button");
btn.type = "submit";
btn.textContent = "Registrar Mascota";

// --- Lista ---
const ulLista = document.createElement("ul");
ulLista.id = "mascotaLista";

// --- Agregar todos los elementos al formulario ---
form.appendChild(labelNombre);
form.appendChild(inputNombre);
form.appendChild(document.createElement("br"));
form.appendChild(errorNombre);
form.appendChild(document.createElement("br"));

form.appendChild(fieldsetEspecie);
form.appendChild(document.createElement("br"));

form.appendChild(labelRaza);
form.appendChild(inputRaza);
form.appendChild(document.createElement("br"));
form.appendChild(errorRaza);
form.appendChild(document.createElement("br"));

form.appendChild(labelSexo);
form.appendChild(selectSexo);
form.appendChild(document.createElement("br"));
form.appendChild(errorSexo);
form.appendChild(document.createElement("br"));
form.appendChild(document.createElement("br"));

form.appendChild(btn);

// --- Agregar formulario y lista al contenedor ---
contenedor.appendChild(form);
contenedor.appendChild(ulLista);

// --- Función para agregar mascota a la lista ---
function agregarMascota(nombre, especie, raza, sexo) {
  const li = document.createElement("li");
  li.textContent = `Nombre: ${nombre}, Especie: ${especie}, Raza: ${raza}, Sexo: ${sexo}`;

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";
  btnEliminar.style.marginLeft = "10px";
  btnEliminar.addEventListener("click", () => {
    ulLista.removeChild(li);
  });

  li.appendChild(btnEliminar);
  ulLista.appendChild(li);
}

// --- Manejo del submit con validaciones ---
form.addEventListener("submit", function(e) {
  e.preventDefault();

  let valido = true;

  // Validar nombre
  if (!inputNombre.value.trim()) {
    errorNombre.textContent = "Debes ingresar el nombre de la mascota";
    valido = false;
  } else {
    errorNombre.textContent = "";
  }

  // Validar especie
  const especieSeleccionada = form.querySelector('input[name="especieMascota"]:checked');
  if (!especieSeleccionada) {
    errorEspecie.textContent = "Debes seleccionar la especie";
    valido = false;
  } else {
    errorEspecie.textContent = "";
  }

  // Validar raza
  if (!inputRaza.value.trim()) {
    errorRaza.textContent = "Debes ingresar la raza de la mascota";
    valido = false;
  } else {
    errorRaza.textContent = "";
  }

  // Validar sexo
  if (!selectSexo.value) {
    errorSexo.textContent = "Debes seleccionar el sexo";
    valido = false;
  } else {
    errorSexo.textContent = "";
  }

  if (!valido) return;

  // Agregar mascota a la lista
  agregarMascota(inputNombre.value, especieSeleccionada.value, inputRaza.value, selectSexo.value);

  // Limpiar formulario
  form.reset();
});



/* FORMULARIO DE TUTOR */
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


// Función para seleccionar rápido
const $ = (sel) => document.querySelector(sel);

const clientes = [];

// Función para validar correo
function validarCorreo(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}

// Función para validar RUT chileno
function validarRut(rut) {
  rut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();

  if (!/^[0-9]+[0-9K]$/.test(rut)) return false;

  const cuerpo = rut.slice(0, -1);
  const dv = rut.slice(-1);

  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  const dvEsperado = 11 - (suma % 11);
  const dvFinal = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

  return dv === dvFinal;
}

// Normalizar RUT (eliminar puntos y guion siempre)
function normalizarRut(rut) {
  return rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
}

// Renderizar lista de clientes
function renderClientes() {
  const lista = $('#outClientes');
  lista.innerHTML = ''; // limpiar antes de volver a dibujar

  clientes.forEach((c, index) => {
    const li = document.createElement('li');
    li.textContent = `${c.nombre} | ${c.rut} | ${c.telefono} | ${c.correo} `;

    // Botón eliminar
    const btnDel = document.createElement('button');
    btnDel.textContent = 'Eliminar';
    btnDel.className = 'pill';
    btnDel.addEventListener('click', () => {
      clientes.splice(index, 1); // eliminar del array
      renderClientes();          // volver a pintar
    });

    li.appendChild(btnDel);
    lista.appendChild(li);
  });
}

// Evento botón Registrar
$('#btnRegistrar').addEventListener('click', (e) => {
  e.preventDefault();

  const nombre = $('#nombreCli').value.trim();
  let rut = $('#rutCli').value.trim();
  const telefono = $('#telCli').value.trim();
  const correo = $('#correoCli').value.trim();

  // Normalizar rut antes de validarlo
  rut = normalizarRut(rut);

  // ⚠️ Validaciones
  if (!nombre || !rut || !telefono || !correo) {
    $('#outClientes').textContent = ' Todos los campos son obligatorios';
    return;
  }
  if (!validarRut(rut)) {
    $('#outClientes').textContent = ` El RUT "${rut}" no es válido`;
    return;
  }
  if (!validarCorreo(correo)) {
    $('#outClientes').textContent = ` El correo "${correo}" no es válido`;
    return;
  }

  // Duplicados
  if (clientes.some(c => c.rut === rut)) {
    $('#outClientes').textContent = ` El RUT ${rut} ya está registrado`;
    return;
  }
    if (clientes.some(c => c.telefono === telefono)) {
    $('#outClientes').textContent = ` El telefono ${telefono} ya está registrado`;
    return;
  }
  if (clientes.some(c => c.correo === correo)) {
    $('#outClientes').textContent = ` El correo ${correo} ya está registrado`;
    return;
  }

  // ✅ Guardar y mostrar (con RUT limpio)
  clientes.push({ nombre, rut, telefono, correo });
  renderClientes();

  // Limpiar formulario
  $('#nombreCli').value = '';
  $('#rutCli').value = '';
  $('#telCli').value = '';
  $('#correoCli').value = '';
});

