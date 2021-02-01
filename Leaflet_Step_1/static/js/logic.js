// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
  // The data.features object is in the GeoJSON standard
  console.log(data.features);

  

});

