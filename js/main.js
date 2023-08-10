// --------- Definiciones de funciones -------------------

// Uso de funcion para comparar elementos de arreglo
function comparar(a, b) {
  return huellacarbono[categorias.indexOf(a)] - huellacarbono[categorias.indexOf(b)];
}

// Uso de funcion para huella de carbono promedio por pais y encontrar las capital del pais
function getCountryFromValue(countryValue) {
  switch (countryValue) {
    case "1":
      ciudad="Ciudad de Mexico";
      return 3.09;
    case "2":
      ciudad="Buenos Aires";
      return 3.4;
    case "3":
      ciudad="Bogota";
      return 1.6;
    case "4":
      ciudad="Lima";
      return 4.7;
    default:
      ciudad="Desconocida";
      return 'País desconocido';
  }
}

// Uso de funcion constructora en objeto con datos del usuario
class Persona{
  constructor(nombre, edad, pais){
    this.nombre=nombre;  
    this.edad=edad;
    this.pais=pais;
  }
}

// Funcion con condicionales para determinar el aumento de temperatura debido al cambio climatico por pais
function aumentocambioclimatico(temperatura){
  if (ciudad=="Ciudad de Mexico"){
    return parseInt(temperatura)+2;
  } else if (ciudad=="Buenos Aires"){
    return temperatura+1.6;
  } else if (ciudad=="Bogota"){
    return temperatura+2.5;
  } else if (ciudad=="Lima"){
    return temperatura+3.5;
  } else{
    return temperatura;
  }
}

// --------- Definiciones de variables -------------------

// Definición de botones
const mascotasnoButton = document.getElementById('mascotasno');
const mascotassiperroButton = document.getElementById('mascotassiperro');
const mascotassigatoButton = document.getElementById('mascotassigato');
const comidapizzaButton = document.querySelector('#comidapizza');
const comidacarneButton = document.querySelector('#comidacarne');
const comidasalmonButton= document.querySelector('#comidasalmon');
const calculoButton=document.getElementById('btn-inicio');
const accionesButton=document.querySelector('#btn-acciones');

// Definición de variables para codigo
let kgeqconducir;
let inicio;
let kgeqcomida;
let mascotas;
let kgmascotas;
let ciudad;
let temperatura;
let temperaturacc;
let texttemp;
const huellacarbono=[];
const categorias = ["Transporte", "Comida", "Mascotas"];


// --------- Event listeners -------------------

// Event listeners para los botones de comida favorita

comidapizzaButton.addEventListener('click', evt0 => {
  evt0.preventDefault();
  comidapizzaButton.classList.toggle('active');
  kgeqcomida = 0.263 * 25;
});

comidasalmonButton.addEventListener('click', evt1 => {
  evt1.preventDefault();
  comidasalmonButton.classList.toggle('active');
  kgeqcomida = 10.4 * 25;
});

comidacarneButton.addEventListener('click', evt2 => {
  evt2.preventDefault();
  comidacarneButton.classList.toggle('active');
  kgeqcomida = 21.7 * 25;
});

// Event listeners tipo de mascota

mascotasnoButton.addEventListener('click', evt3 => {
  evt3.preventDefault();
  mascotasnoButton.classList.toggle('active');
  kgmascotas = 0;
});

mascotassiperroButton.addEventListener('click', evt4 => {
  evt4.preventDefault();
  mascotassiperroButton.classList.toggle('active');
  kgmascotas = 770;
});

mascotassigatoButton.addEventListener('click', evt5 => {
  evt5.preventDefault();
  mascotassigatoButton.classList.toggle('active');
  kgmascotas = 330;
});

// Event listener para hacer el calculo

calculoButton.addEventListener('click', evt6 => {
  evt6.preventDefault();
  calcularHuellaCarbono();
});

// Event listener para generar recomendaciones

accionesButton.addEventListener('click', evt7 => {
  evt7.preventDefault();
  generaacciones();
});


// --------- Funcion principal para calculo de la huella -------------------
function calcularHuellaCarbono() {

  // Obtener datos ingresados por el usuario
  const nombre = document.getElementById('usrnombre').value;
  const pais = document.getElementById('department').value;
  const edad = document.getElementById('usredad').value;
  const kmDiarios = parseFloat(document.getElementById('usrkm').value);

  // Validar que todos los campos requeridos estén completos con Operadores Avanzados y Librerias
  if (!nombre || !pais || !edad || isNaN(kmDiarios)) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Por favor, completa todos los campos requeridos correctamente.'
    });
    return;
  }

  // Cálculo de la huella de carbono del transporte
  kgeqconducir = kmDiarios * 0.192 * 7 * 52;

  //------ Uso de objetos, arreglos y metodos de arreglos -----

  // Objeto perfil de usuario con funcion constructora
  const usuario=new Persona(nombre,edad,pais);

  // Creacion de arreglo con las emisiones por categoria
  huellacarbono.push(kgeqconducir);
  huellacarbono.push(kgeqcomida);
  huellacarbono.push(kgmascotas);

  // Uso del metodo reduce de arreglos
  let kgco2acum = huellacarbono.reduce(function (acumulador, numero) {
    return acumulador + numero;
  }, 0);
  
  // Uso de metodo sort para encontrar mayor impacto ambiental
  categorias.sort(comparar);
  huellacarbono.sort((a, b) => a - b);

  //------ Manipulacion de DOM para impresion de resultados -----

  // Resultado total de emisiones
  let totaltext = `🌏 Hola ${nombre}, tu transporte, alimentos y mascotas acumulan ${kgco2acum.toFixed(3)} kilogramos de CO2 equivalente`;
  let resultadoElement = document.getElementById('resultado');
  resultadoElement.textContent = totaltext;

  // Resultado categoria de mayor impacto
  let textcategoria="Tu categoría con mayor impacto ambiental es: "+categorias[categorias.length - 1];
  let categoriaElement=document.getElementById('resultadoimpacto');
  categoriaElement.textContent=textcategoria;


  // ----- Almacenamiento y recuperacion de datos LocalStorage ------
  
  // Almacenamiento en Local Storage
  huellacarbono.unshift(usuario);
  localStorage.setItem("perfilcarbono", JSON.stringify(huellacarbono));
  
  // Obtener datos de  Local Storage
  const dataFromLocalStorage = JSON.parse(localStorage.getItem('perfilcarbono'));
  const countryValue = dataFromLocalStorage[0].pais;


  // Obtener huella de carbono promedio en pais a partir del valor recuperado de Local Storage
  const countryfootprint = getCountryFromValue(countryValue);
  let textavrg=`☘️ Sabías que ... El promedio de huella de carbono en tu país es de ${countryfootprint} toneladas de CO2 equivalente anualmente considerando transporte, energía, alimentos, ropa, entre otros.`;
  let avrgElement=document.getElementById('avrgpais');
  avrgElement.textContent=textavrg;


  // ----- APIs, Promesas, AJAX & Fetch y Condicionales ------

  // Obtencion de datos de temperatura
  const key = "54ddf01e42642fb5f112a96c2890ddd9";
  ciudad = encodeURIComponent(ciudad);  

  // Funcion para obtener datos del API, con promesas, AJAX & Fetch
  async function gettemperatura(key) {
    if (ciudad !== "") {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${key}`;
      try {
        const temperaturaResponse = await fetch(url);
        const clima = await temperaturaResponse.json();
        let temp = clima.main.temp;
        let temperaturaconv = temp - 273.15;
        return temperaturaconv;
      } catch (e) {
        throw new Error(e);
      }
    }
    return null;
  }
  
  (async () => {
    try {
      temperatura = await gettemperatura(key);
      if (temperatura !== null) {
        temperaturacc=parseFloat(temperatura);
        console.log(ciudad)
        if (ciudad=="Ciudad%20de%20Mexico"){
          temperaturacc+=2;
        } else if (ciudad=="Buenos%20Aires"){
          temperaturacc+=1.6;
        } else if (ciudad=="Bogota"){
          temperaturacc+=2.5;
        } else if (ciudad=="Lima"){
          temperaturacc+=3.5;
        } 
        console.log(temperaturacc);
        texttemp=`🚨Hoy en la capital de tu país la temperatura es de ${temperatura.toFixed(2)}°C, pero podría llegar hasta ${temperaturacc.toFixed(2)} en 2050 °C, sobrepasando el punto de no retorno.`;
        let temphtml = document.querySelector('#temperatura');
        temphtml.textContent = texttemp;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  })();

  

  // Uso de libreria sweet alert
  let calculoconcluido=true;
  if(calculoconcluido) {
    Swal.fire({
      icon: 'info',
      title: 'Calculando...',
      text: 'Estamos por ver tus resultados. Ve a la sección después de recomendaciones.'
    });
  }
}

function generaacciones(){

  // Objetos y arreglos con las recomendaciones para reducir la huella de carbono por categoria
  const acciones = {
    transporte: [
      "Usa bicicleta o camina en distancias cortas.",
      "Utiliza el transporte público en lugar de vehículo privado.",
      "Comparte viajes con otras personas.",
      "Opta por vehículos de bajo consumo de combustible.",
      "Considera trabajar desde casa para reducir viajes.",
    ],
    mascotas: [
      "Compra alimentos para mascotas con ingredientes sustentables.",
      "Utiliza bolsas biodegradables para recoger desechos.",
      "Adopta en lugar de comprar mascotas.",
      "Evita el uso excesivo de productos de aseo para mascotas.",
      "Recicla y reutiliza juguetes y accesorios para mascotas.",
    ],
    alimentacion: [
      "Consume menos carne y más vegetales.",
      "Compra alimentos locales y de temporada.",
      "Reduce el desperdicio de comida planificando tus comidas.",
      "Prefiere productos con envases reciclables o reutilizables.",
      "Evita el consumo excesivo de productos procesados.",
    ],
  };
  
  // Funcion para seleccionar la accion de forma aleatoria y validar que no se repitan las acciones
  function getRandomAction(arr, usedActions) {
    const availableActions = arr.filter(action => !usedActions.includes(action));
    const randomIndex = Math.floor(Math.random() * availableActions.length);
    return availableActions[randomIndex];
  }
  
  // Funcion para iterar la seleccion aleatoria de acuerdo con el numero de acciones seleccionadas y la categoria
  async function mostrarAcciones(categoria, cantidad) {
    const categoriaAcciones = acciones[categoria];
    if (categoriaAcciones) {
      const usedActions = [];
      const selectedActions = [];
  
      for (let i = 0; i < cantidad; i++) {
        if (usedActions.length === categoriaAcciones.length) {
          break; // Evitar bucle infinito si todas las acciones se han utilizado
        }
        const accion = getRandomAction(categoriaAcciones, usedActions);
        selectedActions.push(accion); // Almacenamiento en array de las acciones seleccionadas
        usedActions.push(accion);
      }
      
      // Mensaje a imprimir con las acciones seleccionadas de forma aleatoria
      const mensaje = `Acciones recomendadas para reducir la huella de carbono en ${categoria}:
  ${selectedActions.map((accion, index) => `${index + 1}. ${accion}`).join("\n")}`;
      
    // Despliegue del mensaje usando la libreria Sweet Alert
      try {
        await Swal.fire({
          title: "Acciones para reducir la huella de carbono",
          html: mensaje,
          icon: "info",
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error,
        });
      }
    }
  }
  
  (async () => {
    // Obtener datos ingresados por el usuario
    const categoriaUsuario = document.getElementById('cfclass').value;
    const cantidadSeleccionada = parseInt(document.getElementById('numact').value);

    // Llamar a las funciones para la seleccion aleatoria de recomendaciones
    if (cantidadSeleccionada >= 1 && cantidadSeleccionada <= 5) {
      mostrarAcciones(categoriaUsuario, cantidadSeleccionada);
    } else {
      // Mostrar mensaje de error cuando los parametros no cumplen
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, completa todos los campos requeridos correctamente.'
      });
    }
  })();
}