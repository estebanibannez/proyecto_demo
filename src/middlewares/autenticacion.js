const jwt = require('jsonwebtoken');
const cfg = require('../config/configuration');

// =====================
// Verificar Token
// =====================
let verificaToken = (req, res, next) => {
    //obtengo del header el token
    let token = req.get('token');

    jwt.verify(token, cfg.SECRETTOKEN, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }
        req.token = token;
        req.usuario = decoded.usuario;
        next();

    });



};

// =====================
// Verifica AdminRole
// =====================
let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {

        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }
};
// =====================
// CREA TOKEN
// =====================

let creaToken = (data) => {
    let token = jwt.sign({
        usuario: data
    }, cfg.SECRETTOKEN, { expiresIn: cfg.CADUCIDADTOKEN });
    return token;
};

module.exports = {
    verificaToken,
    verificaAdmin_Role,
    creaToken
}