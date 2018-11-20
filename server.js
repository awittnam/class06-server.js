'use strict'

//applications dependencies (express and CORS)
const express = require('express');
const cors = require('cors');

//load environment variables with DotENV
require('dotenv').config; //environment variable
const app = express();  //create app instance
app.use(cors());

//Application setup
const PORT = process.env.PORT;

//API Routes
app.get('/location', handleLocation);

//Helper Functions


//Make sure the server is listening
app.listen(PORT, () => console.log (`server is listening on PORT: ${PORT}`));