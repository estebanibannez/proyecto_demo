const Usuario = require('../models/usuario-model');
const bcrypt = require('bcrypt');
//formateo el body del post
const bodyCreateUsuario = (req) => {

    var body = {
        name: req.body.name,
        job: req.body.job,
    }

    return body;
};

const bodySchemaUsuario = (req) => {

    console.log(req.body);
    
    var usuario =  new Usuario({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,10),
        role: req.body.role
    });
    return usuario;
};

module.exports = {
    bodyCreateUsuario,
    bodySchemaUsuario
};