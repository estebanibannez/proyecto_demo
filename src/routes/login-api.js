// const router = require('express').Router();
const cfg = require('../config/configuration');
const express = require('express');
const app = express();
const service = require('../services/login-service');
const uHttp = require('../utils/utils-http');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(cfg.CLIENT_ID);
const { creaToken } = require('../middlewares/autenticacion');

app.post('/login', async(req, res) => {
    // ==============valido si existe usuario en la base de datos y le genero un
    // token ==================//
    var usuario = await service.validaUsuario(req);
    console.log("validación usuario --> ", usuario);

    try {
        if (!usuario.flag) {
            console.log("error");
            return res.json(uHttp.StatusBodyError("400", usuario));
        }
        return res.json(uHttp.StatusBodyOkToken("200", usuario.usuario, usuario.token));

    } catch (error) {
        console.log(error);
        return res.json(uHttp.StatusBodyError("500", `Ocurrió un error ${error}`));

    }

});

//======= verifica token de google ======//
//======================================//
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID || cfg.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend: [CLIENT_ID_1, CLIENT_ID_2,
        // CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    // console.log(payload.name);
    // console.log(payload.email);
    // console.log(payload.picture);

    return {
        nombre: payload.name,
        email: payload.email,
        imagen: payload.picture,
        google: true
    };

}
// verify().catch(console.error);


//==================== luego de logearse con libreria google sign in verifico el token de Google =========//
app.post('/google', async(req, res) => {

    let googletoken = req.body.idtoken;
    let nombres = req.body.nombres;
    let apellidos = req.body.apellidos;

    // console.log("body completo desde js signin :", req.body);
    let usuarioGoogle = await verify(googletoken).catch(error => {

        console.log(`Ocurrió un error en validación de token google : ${error}`);
        return res.status(403).json(uHttp.StatusBodyError("403", "Ocurrió un error en la autenticación google"));
    });

    console.log(' dentro de /authgoogle', usuarioGoogle);

    //verificar que usuario no esté registrado con el correo en la bd
    const Usuario = require("../models/usuario-model");

    //busco usuario en la base de datos , si existe arrojo error
    Usuario.findOne({
        email: usuarioGoogle.email
    }, (err, usuariodb) => {
        console.log("respuesta findOne", usuariodb)
        if (usuariodb != null) {


            if (err) {
                return res.json(uHttp.StatusBodyError("500", `Ocurrió un error: ${err}`));
            }
            //si existe usuario registrado en bd ,y tiene google en falso, debe iniciar con su cuenta normal
            if (usuariodb) {
                if (usuariodb.google == false) {
                    return res.json(uHttp.StatusBodyError("400", "Usuario ya está registrado, debe iniciar con su sesión normal"));
                } else {
                    // en caso contrario el usuario está creado , debo generarle un nuevo token 
                    const token = creaToken(usuariodb);
                    return res.json(uHttp.StatusBodyOkToken("200", usuariodb, token));
                }
            } else {
                //si usuario no existe , se crea en la base de datos

                let usuario = new Usuario();

                usuario.nombre = nombres;
                usuario.apellidos = apellidos;
                usuario.email = usuarioGoogle.email;
                usuario.img = usuarioGoogle.imagen;
                usuario.google = true;
                usuario.password = ':)';



                usuario.save((error, usuariodb) => {

                    if (error) {
                        console.log("ocurrió un error de guardado de usuario nuevo --> ", error);
                        return res.json(uHttp.StatusBodyError("500", `Ocurrió un error ${error}`));

                    }
                    //si no hay error entonces creo un token y lo regreso
                    console.log("usuario no existe en la bd , se crea --> ", usuariodb);
                    const token = creaToken(usuariodb);
                    return res.json(uHttp.StatusBodyOkToken("200", usuariodb, token));

                });
            }

        }


    })
});

module.exports = app;