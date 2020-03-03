//=============== archivo de ruteo ================//
//== aquí van todas las rutas de la api ==========//
//===============================================//
const express = require('express');
const app = express();



app.use(require('./usuarios-api'));
app.use(require('./login-api'));


module.exports = app;