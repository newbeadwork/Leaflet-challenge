

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson";


d3.json(queryUrl).then(function(data) {
  
  console.log(data.features);

  
  //var earthquakes = L.geoJSON(data.features);

  

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  
  
  

function onEachFeatureFunc(feature, layer) {
   layer.bindPopup("<h3>" + feature.properties.place +
     "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
     "</h3><hr><p><strong>Magnitude: " + feature.properties.mag + "</strong></p>" +
     "</h3><hr><p><strong>Depth (miles):" + feature.geometry.coordinates[2] + "</strong></p>");
     
 }

 function getColor(d) {
  return d > 90
    ? "#800026"
    : d > 70
    ? "#BD0026"
    : d > 50
    ? "#E31A1C"
    : d > 30
    ? "#FC4E2A"
    : d > 10
    ? "#ffeda0"
    : d <= 10
    ? "#99d8c9"
    : "#FFF";
}

 function pointToLayerFunc(feature, latlng) {
  feature.properties.mag = +feature.properties.mag;
  feature.geometry.coordinates[2] = +feature.geometry.coordinates[2];
  
  var geojsonMarkerOptions = {
    radius: feature.properties.mag*3,
    fillColor: getColor(feature.geometry.coordinates[2]),
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.6
  };
  return L.circleMarker(latlng, geojsonMarkerOptions);
  
 }

   var earthquakes = L.geoJSON(data.features, {
     onEachFeature: onEachFeatureFunc,
     pointToLayer: pointToLayerFunc
   });
   var myMap = L.map("mapid", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [darkmap, earthquakes]
  });

  var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [-10, 10, 30, 50, 70, 90],
        labels = ['<strong> Depth of earthquakes(miles) </strong>'];
        

        for (var i = 0; i < grades.length; i++) {
            from = grades [i];
            to = grades[i+1]-1;
    
        labels.push(
            '<i style="background:' + getColor(from + 1) + '"></i> ' +
            from + (to ? '&ndash;' + to : '+'));
            }
            div.innerHTML = labels.join('<br>');
            return div;
    
};

legend.addTo(myMap);
  });

  