//importer express, bodyparser, mongoose, thing (modèle mongoose)
const bodyParser= require('body-parser')
const express = require('express');
const helmet = require("helmet");
//facilite les interactions avec la base de données
const mongoose = require('mongoose');
//Donne acccès au chemin du systeme de fichier
const path = require('path');
const app = express();
//variable d'environnement
require('dotenv').config()
//importer les routes
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

// à revoir
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Helmet est une collection de plusieurs middleware qui définissent des en-têtes HTTP liés à la sécurité
app.use(helmet());

const connectMongoose = process.env.MONGOOSE;
mongoose.connect(connectMongoose,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//prévenir erreurs de CORS (Cross Origin Resource Sharing)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);



module.exports = app;

