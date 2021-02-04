d3.json("static/PB2002_boundaries.json").then(function (data) {

    //Checking the data
    console.log(data.features);
  
    //Creating a base layer
    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "dark-v10",
      accessToken: API_KEY
});



  //Layer for markers-circles and pop-ups
  var earthquakes = L.geoJSON(data.features, {
    //onEachFeature: createPopups,
    //pointToLayer: createCircles
  });
  
  //Adding layer to the map
  var myMap = L.map("mapid", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [darkmap, earthquakes]
  });
})