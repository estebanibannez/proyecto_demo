//=============== archivo de ruteo ================//
//== aquí van todas las rutas de la api ==========//
//===============================================//
const express = require('express');
const app = express();
const cfg = require('./configuration');


app.use(require('../routes/usuarios-api'));
app.use(require('../routes/login-api'));


module.exports =  app;