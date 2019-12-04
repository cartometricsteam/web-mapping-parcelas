/****************************************************/
/******************* DEFINICIONES *******************/
/****************************************************/

// Añadir la clave de acceso para conectarte a la API de Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiY2FydG9tZXRyaWNzbGFiIiwiYSI6ImNrM2JnanIzMjBsZHQzbW1yM2h2OWxieHMifQ.MCULumHFKyTPrBNEETSBww';

// Definición de variables
var años = ['< 1900', '1900-10', '1910-20', '1920-30', '1930-40', '1940-50', '1950-60','1960-70', '1970-80','1980-90', '1990-2000', '> 2000' ];
var colores = ['#000000', '#350866', '#57258e', '#8f23a4', '#e21daa', '#e10e94', '#f96743', '#d96b1c', '#f9b343', '#ffda61', '#fff475', '#fffd94'];

/****************************************************/
/*********************** MAIN ***********************/
/****************************************************/

// Crear el mapa
var mapa = new mapboxgl.Map({
  container: 'mapa', // el elemento HTML con id='mapa' es el contenedor del mapa
  style: 'mapbox://styles/cartometricslab/ck3hk5ggs13n91dpg436umwul', // estilo del mapa base inicial
  center: [-5.952, 37.388], // coordenadas [lng, lat] del centro inicial
	zoom: 12, // nivel de zoom inicial
});

// Añadir controles de zoom y rotación
mapa.addControl(new mapboxgl.NavigationControl(), 'top-left');

// Añadir buscador geográfico
mapa.addControl(new MapboxGeocoder({
	accessToken: mapboxgl.accessToken,
	mapboxgl: mapboxgl,
	collapsed: true,
	language: 'es',
	placeholder: 'Buscar'
}), 'top-left');

// Añadir leyenda
var leyenda = document.getElementById('leyenda');
for (i = 0; i < años.length; i++) {
  var capa = años[i];
  var color = colores[i];
  var elemento = document.createElement('div');
  var cuadrado = document.createElement('span');
  cuadrado.className = 'cuadrado';
  cuadrado.style.backgroundColor = color;
  var valor = document.createElement('span');
  valor.innerHTML = capa;
  elemento.appendChild(cuadrado);
  elemento.appendChild(valor);
  leyenda.appendChild(elemento);
}

mapa.on('load', function () {
	// Añadir Popups una vez cargue el mapa con la capa de edificios
	mapa.on('click', 'sevi1-0uh0df', añadirPopup);
	mapa.on('click', 'sevi2-7em0mi', añadirPopup);

	// Cambiar el cursor del ratón al pasar por encima / salir de una parcela
	mapa.on('mouseenter', 'sevi1-0uh0df', function () {
		mapa.getCanvas().style.cursor = 'pointer';
	});

	mapa.on('mouseleave', 'sevi1-0uh0df', function () {
		mapa.getCanvas().style.cursor = '';
	});

	mapa.on('mouseenter', 'sevi2-7em0mi', function () {
		mapa.getCanvas().style.cursor = 'pointer';
	});

	mapa.on('mouseleave', 'sevi2-7em0mi', function () {
		mapa.getCanvas().style.cursor = '';
	});
});


/****************************************************/
/******************** FUNCIONES *********************/
/****************************************************/
function añadirPopup(e) {
	var coordinates = e.lngLat;
	var año = e.features[0].properties.d;
	var popupContent = '<h1>PARCELA</h1><div><strong>Año edificio: </strong>'+ año +'</div>'
	 
	new mapboxgl.Popup()
		.setLngLat(coordinates)
		.setHTML(popupContent)
		.addTo(mapa);
}