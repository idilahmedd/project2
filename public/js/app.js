console.log('Hello Mapbox');
console.log(markerCoords);
mapboxgl.accessToken = 'pk.eyJ1IjoiaWRpbGFobWVkZCIsImEiOiJjanhleHF5aG4wdHZ4M25tcGV3aTA0NnYzIn0.LBnUb5veCKQjO4h4r_TF4g';

var map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/streets-v9',
    center: markerCoords[0],
    zoom: 9
});

const geoJson = {
    "type": "FeatureCollection",
    "features": markerCoords.map(function(coord){
        let marker = {
            "type": "Feature",
            "properties": {
				"message": "Here I am",
				"icon": {
                    "iconSize": [50, 50], // size of the icon
                    "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
                    "popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
                    "className": 'dot'
                }
            
            },
            "geometry": {
                "type": "Point",
                "coordinates": coord
            }
        }
        return marker
    })
}
geoJson.features.forEach(function (marker) {
	console.log(marker.properties)
	//create a DOM element for the marker
	var el = document.createElement('div');
	el.className = 'marker';
    el.style.backgroundImage = 'url(../img/icons8-record-48.png)';
	el.style.width = marker.properties.icon.iconSize[1] + 'px';
	el.style.height = marker.properties.icon.iconSize[1] + 'px';

	el.addEventListener('click', function () {
		let handle = document.getElementById('message')
		console.log({handle, msg: marker.properties.message})
		handle.textContent = marker.properties.message
	});
	// add marker to map
	new mapboxgl.Marker({element: el, anchor: 'center'})
		.setLngLat(marker.geometry.coordinates)
		.addTo(map);

});

map.on('load', function () {
	console.log("I'M TRYING TO RUN THE MAP SCRIPT!!!")
	let layers = map.getStyle().layers;
	let labelLayerId;
	for (let i = 0; i < layers.length; i++) {
		if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
			labelLayerId = layers[i].id;
			break;
		}
	}
	map.addLayer({
		"id": "3d-buildings",
		"source": "composite",
		"source-layer": "building",
		"filter": ["==", "extrude", "true"],
		"type": "fill-extrusion",
		"minzoom": 12,
		"paint": {
			"fill-extrusion-color": "#009e60",
			"fill-extrusion-height": [
				"interpolate",
				["linear"],
				["zoom"],
				12,
				0,
				12.05,
				["get", "height"]
			],
			"fill-extrusion-base": [
				"interpolate",
				["linear"],
				["zoom"],
				12,
				0,
				12.05,
				["get", "min_height"]
			],
			"fill-extrusion-opacity": 0.6
		}
	}, labelLayerId)
});





console.log("Static script file finished running!!!!!!");