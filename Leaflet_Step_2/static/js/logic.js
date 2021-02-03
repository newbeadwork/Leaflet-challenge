
var queryUrl = "static/PB2002_boundaries.json";

//Opening the data
d3.json(queryUrl).then(function (data) {

  //Checking the data
  console.log(data.features);
})
