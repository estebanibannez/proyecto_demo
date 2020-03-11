//=============== archivo de ruteo ===============//
//==== aquí van todas las rutas del api ==========//
//================================================//

const cfg = require("../config/configuration");
const express = require('express');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(require('./usuarios-api'));
app.use(require('./login-api'));
app.use(require('./redis-api'));

module.exports = app;