const Usuario = require('../models/usuario-model');
const bcrypt = require('bcrypt');

const validaUsuario = async(usuario) => {

    user = usuario.body;
    // console.log("usuario en validación", user);

    var resUser = Usuario.findOne({
        email: user.email
    }, (err, usuarioDB) => {
        try {
            // console.log("usuario en base de datos ", usuarioDB);
            var compare = bcrypt.compareSync(user.password, usuarioDB.password);

            if (err) {
                console.log("--> error" + err);
                return false;
            }
            if (!usuarioDB) {
                console.log("--> usuario no éxiste en la bd");
                return false;
            }
            if (!compare) {
                console.log("--> usuario y contraseña distintos");
            } else {
                // console.log("retorno éxitoso");
                return true;
            }

        } catch (error) {
            console.log(error);
        }

    });
    return resUser;
}

module.exports = {
    validaUsuario

};