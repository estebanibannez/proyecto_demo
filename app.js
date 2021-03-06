const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cfg = require("./src/config/configuration");
const mongoose = require('mongoose');
const hbs = require('hbs');
const path = require('path');
const dir = path.join(__dirname, 'public');
const morgan = require('morgan');
const port = cfg.puerto.webPort;

// ===========configuración global de rutas ================//
app.use(cfg.API_VERSION, require('./src/routes/rutas'));
// ========================================================//

mongoose.set('useCreateIndex', true)

// ================== middlewares ==========================// ==========cabecera
// de las respuestas.==================//
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});
// parse application/x-www-form-urlencoded parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// ==================pagina publica=====================// app.use('/',

app.use(express.static(dir)); //  "public" off of current is root
app.use(express.static('/images'));

//============ ENGINE EXPRESS HBS==============//
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

var conexiondb;

//============== Conexión a mongodb ===================//
if (cfg.ENVIROMENT.env === 'DEV') {
    conexiondb = cfg.CONEXIONBD.desarrolloDB
} else {
    conexiondb = cfg.CONEXIONBD.productionDB
}

mongoose.connect(conexiondb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log("Ocurrió un error con la conexión a la bd -->", err);
    }

}).then((res) => { /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
    console.log("===Base de datos moongose en línea:===");
    console.log("Conexión mongoose ", conexiondb);
});
console.log("======================================");
console.log("|Entorno de desarrollo actual : ", cfg.ENVIROMENT.env + "|");
app.listen(port, () => {
    console.log("======================================");
    console.log("|API corriendo en el puerto! : ", port + "|");
    console.log("======================================");
});

//===================GET INICIAL=================//
app.get('/', (req, res) => {

    var obj = {
        anio: new Date().getFullYear()
    };

    console.log("entró en login app");
    res.render('home', obj);

});