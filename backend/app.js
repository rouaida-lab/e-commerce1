const express = require('express');
require('dotenv').config();
require('express-async-errors');
require('dotenv').config();
const mongoose = require('mongoose')
const router = require('./routes/routes')
const connectDB = require('./db/connect');
const cors  =require('cors')
const app = express()
app.use(cors());

mongoose.connect(process.env.MONGO_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  app.use(express.json());

//routes
app.use('/',router);
module.exports = app;