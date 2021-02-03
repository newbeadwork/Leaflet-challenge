

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
     "</h3><hr><p><strong>" + feature.properties.mag + "</strong></p>");
     
 }

 

 function pointToLayerFunc(feature, latlng) {
  feature.properties.mag = +feature.properties.mag;
  var geojsonMarkerOptions = {
    radius: feature.properties.mag*2,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
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
  
  });

  