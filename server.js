'use strict'

//applications dependencies (express and CORS)
const express = require('express');
const cors = require('cors');

//load environment variables with DotENV
require('dotenv').config; //environment variable
const app = express(); //create app instance
app.use(cors());

//Application setup
const PORT = process.env.PORT;

//API Routes
app.get('/location', (request, response) => {
  console.log(request.query.data, 'Is the query that came from the search field in the browser.'); //this is how we will send the actual query when we move to real date rather than mocked date.
  const locationData = searchToLatLong(request.query.data); //this is what gets sent back to the browser
  console.log(locationData);
  response.send(locationData);
});

//Helper Functions
function searchToLatLong(query) {
  const geoData = require('./data/geo.json');
  const location = new Location(geoData.results[0]);
  location.search_query = query; //adding our actual search query back on and sending it back to the browser
  return location;
}

//this is the constructor we are using to tidy up the data and send the browser only the information that it needs.
function Location(data){
  this.formatted_query = data.formatted_address;
  this.latitude = data.geometry.location.lat;
  this.longitude = data.geometry.location.lng;
}


//Make sure the server is listening
app.listen(PORT, () => console.log (`server is listening on PORT: ${PORT}`));
