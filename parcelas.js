/****************************************************/
/******************* DEFINICIONES *******************/
/****************************************************/

// Añadir la clave de acceso para conectarte a la API de Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiY2FydG9tZXRyaWNzIiwiYSI6ImNqOGJ2ZXIzazAxd3kyd3AyMDVrOGpzNWkifQ.KwvwFfoDOeLnjR1gEHO8tg';

// Definición de variables
var años = ['< 1900', '1900-10', '1910-20', '1920-30', '1930-40', '1940-50', '1950-60','1960-70', '1970-80','1980-90', '1990-2000', '> 2000' ];
var colores = ['#000000', '#350866', '#58258e', '#8d23a3', '#e01da9', '#e20f95', '#f96945', '#d86a1c', '#f9b445', '#ffda60', '#fff375', '#fffd96'];

/****************************************************/
/*********************** MAIN ***********************/
/****************************************************/

// Crear el mapa
var mapa = new mapboxgl.Map({
  container: 'mapa', // el elemento HTML con id='mapa' es el contenedor del mapa
  style: 'mapbox://styles/cartometrics/cj9iau8enap8k2rmocf4a4m3r', // estilo del mapa base inicial
  center: [-4.428290, 36.720402], // coordenadas [lng, lat] del centro inicial
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
  cuadrado.className = 'cuadrado-leyenda';
  cuadrado.style.backgroundColor = color;
  var valor = document.createElement('span');
  valor.innerHTML = capa;
  elemento.appendChild(cuadrado);
  elemento.appendChild(valor);
  leyenda.appendChild(elemento);
}

// Añadir Popups una vez cargue el mapa con la capa de edificios
mapa.on('load', function () {
  mapa.on('click', 'buildings-do4vkm', function (e) {
  	var coordinates = e.lngLat;
		var año = e.features[0].properties.año;
		var popupContent = '<h1>PARCELA</h1><div><strong>Año edificio: </strong>'+ año +'</div>'
		 
		new mapboxgl.Popup()
			.setLngLat(coordinates)
			.setHTML(popupContent)
			.addTo(mapa);
	});

	// Cambiar el cursor del ratón al pasar por encima / salir de una parcela
	mapa.on('mouseenter', 'buildings-do4vkm', function () {
		mapa.getCanvas().style.cursor = 'pointer';
	});

	mapa.on('mouseleave', 'buildings-do4vkm', function () {
		mapa.getCanvas().style.cursor = '';
	});
});