'use strict'

//applications dependencies (express and CORS)
const express = require('express');
const superagent = require('superagent');
const cors = require('cors');

//load environment variables with DotENV
require('dotenv').config(); //environment variable
const app = express(); //create app instance


//Application setup
const PORT = process.env.PORT;
app.use(cors());

//API Routes
app.get('/location', (request, response) => {
  searchToLatLong(request.query.data)
    .then( (location) => response.send(location))
    .catch((error) => handleError(error, response));
});



//Helper Functions    ****NEED TO PUT IN URL!!!!!!!
function searchToLatLong(query) {
  const url =  ;  //need URL

  return superagent.get(url)
  .then( (res) => {
    return new Location(query, res);
  })
  .catch((error, res) => handleError(error, err));
}

function handleError(error, res) {
  console.error(error);
  if (res) res.status(500).send('Sorry, something broke');
}

//this is the constructor we are using to tidy up the data and send the browser only the information that it needs.
function Location(query, data){
  this.search_query = query;
  this.formatted_query = data.body.results[0].formatted_address;
  this.latitude = data.body.results[0].geometry.location.lat;
  this.longitude = data.body.results[0].geometry.location.lng;
}


//Make sure the server is listening
app.listen(PORT, () => console.log (`server is listening on PORT: ${PORT}`));
