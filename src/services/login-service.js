const Usuario = require('../models/usuario-model');
const bcrypt = require('bcrypt');
const jwt = require('../middlewares/autenticacion');
const uHttp = require('../utils/utils-http');

const validaUsuario = (usuario) => {

    return Usuario.findOne({ email: usuario.body.email })
        .then(userdb => {
            if (userdb != null) {

                var passEquals = bcrypt.compareSync(usuario.body.password, userdb.password);
                if (!passEquals) {
                    return { usuario: userdb, message: "usuario o contraseña invalida", flag: false };
                } else {
                    console.log("usuario encontrado en base de datos ", userdb);
                    let token = jwt.creaToken(userdb);
                    return { usuario: userdb, message: "usuario correcto", flag: true, token };
                }

            } else {
                return { usuario: userdb, message: "usuario no encontrado", flag: false };
            }
        })
        .catch((error) => {
            return {
                usuario: null,
                message: `ocurrió un error ${error}`,
                flag: false
            };
        });
}



module.exports = {
    validaUsuario

};