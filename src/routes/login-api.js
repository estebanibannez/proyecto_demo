const router = require('express').Router();
const call = require('../utils/caller-service');
const service = require('../services/login-service');
const Usuario = require('../models/usuario-model');
const utoken = require('../utils/utils-tokens');
const uHttp = require('../utils/utils-http');

const _ = require('underscore');

router.post('/login', async(req, res) => {

    const usuario = await service.validaUsuario(req);

    try {
        if (usuario) {
            console.log("error");
            return res.json(uHttp.StatusBodyError("400",usuario));
        }
        return res.json(utoken.tokenMask(usuario));

    } catch (error) {
        console.log(error);
    }

    res.json({ok: true});

});

module.exports = router;