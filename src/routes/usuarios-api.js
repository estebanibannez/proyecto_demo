const router = require('express').Router();
const call = require('../utils/caller-service');
const service = require('../services/usuarios-service');
const uHttp = require('../utils/utils-http');
const helper = require('../helpers/usuarios-helper');
const mongoose = require('mongoose');

router.get('/getusers', async(req, res) => {
    try {
        var responseAPI = await service.getDataUsuarios();
        return res
            .status(200)
            .json({ response: 'OK', data: responseAPI.body });
    } catch (error) {
        return res.json(uHttp.StatusBodyError("500", error.message));
    }

});

router.get('/getuser/:id', async(req, res) => {

    let id = req.params.id;
    try {
        var responseAPIuser = await service.getDataUsuario(id);

        return res
            .status(200)
            .json({ status: 200, response: 'OK', data: responseAPIuser.body });

    } catch (error) {
        return res.json(uHttp.StatusBodyError("500", error.message));
    }

});

router.post('/createuser', async(req, res) => {
    try {

        var responseAPIuser = await service.createUsuario(req);

        return res
            .status(201)
            .json({ status: 200, response: 'OK', data: responseAPIuser.body });
    } catch (error) {
        return res.json(uHttp.StatusBodyError("500", error.message));
    }

});

router.put('/updateuser/:id', async(req, res) => {
    var id = req.params.id;
    var request = req.body;
    try {
        var responseAPIuser = await service.updateUsuario(id, request);
        console.log(responseAPIuser);
        return res
            .status(200)
            .json({ status: 200, response: 'UPDATE', data: responseAPIuser.body });
    } catch (error) {
        return res.json(uHttp.StatusBodyError("500", error.message));
    }

});

// http usuario en mongo

router.post('/createusermongo', (req, res) => {

    var usuario = helper.bodySchemaUsuario(req);
    console.log("into /createusermongo", usuario);
    usuario.save((err, usuarioDb) => {
        if (err) {
            return res.status(400).json(uHttp.StatusBodyError("400", err));
        }

        return res
            .json(uHttp.StatusBodyOk("OK", usuarioDb));

    });

});


module.exports = router;