// const router = require('express').Router();

const express = require('express');
const app = express();
const service = require('../services/login-service');
const uHttp = require('../utils/utils-http');



app.post('/login', async(req, res) => {

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

    res.json({ ok: true });

});

module.exports = app;