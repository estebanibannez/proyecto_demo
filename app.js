const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const cfg = require("./src/config/configuration");

//seteo de variables
// app.set('port', cfg.puerto.webPort);

//settings
const port = cfg.puerto.webPort;
// =========== middlewares ================== //

//seteando la cabecera de las respuestas.
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});
// parse application/x-www-form-urlencoded
// parse application/json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
    // app.use(express.json({ limit: '500mb' }));
    // app.use(express.urlencoded({ limit: '500mb', extended: false }));

//seteo las rutas
app.use(cfg.API_VERSION, require('./src/routes/usuarios-api'));

// ========================================== //

app.listen(port, () => {

    console.log("app run en puerto: ", port);


});