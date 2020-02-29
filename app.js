const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const cfg = require("./src/config/configuration");
const mongoose = require('mongoose');
const hbs = require('hbs');
const path = require('path');
const dir = path.join(__dirname, 'public');
//seteo de variables app.set('port', cfg.puerto.webPort); settings
const port = cfg.puerto.webPort;


mongoose.set('useCreateIndex', true)
    // Le indicamos a Mongoose que haremos la conexión con Promesas mongoose.Promise
    // = global.Promise; =========== middlewares ================== // seteando la
    // cabecera de las respuestas.
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});
// parse application/x-www-form-urlencoded parse application/json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cfg.API_VERSION, require('./src/routes/usuarios-api'));

//==================pagina publica=====================//
// app.use('/', express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/public'));
app.use(express.static(dir)); //  "public" off of current is root
app.use(express.static('/images'));

//============ ENGINE EXPRESS HBS==============//
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


//============== Conexión a mongodb ===================//
mongoose.connect('mongodb://localhost:27017/proapinode', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log("Ocurrió un error con la conexión a la bd -->", err);

    }
});


app.listen(port, () => {
    console.log("app run en puerto: ", port);
});


app.get('/', (req, res) => {


    var obj = {
        anio: new Date().getFullYear()
    };

    console.log("entra login");
    res.render('home', obj);


});