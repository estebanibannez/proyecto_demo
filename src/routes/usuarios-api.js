const router = require('express').Router();
const call = require('../utils/caller-service');
const service = require('../services/usuarios-service');
const uHttp = require('../utils/utils-http');
const Usuario = require('../models/usuario-model');

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

router.post('/createUser', async(req, res) => {
    try {

        var responseAPIuser = await service.createUsuario(req);

        return res
            .status(201)
            .json({ status: 200, response: 'OK', data: responseAPIuser.body });
    } catch (error) {
        return res.json(uHttp.StatusBodyError("500", error.message));
    }

});

router.put('/updateUser/:id', async(req, res) => {
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

router.post('./createUserMongd', (req, res) => {

    var usuario = new Usuario({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });

    usuario.save((err, usuarioDb) => {
        if (err) {
            return res.status(400).json(uHttp.StatusBodyError("400", err));
        }

        return res.status(200)
            .json(uHttp.StatusBodyOk(200, usuarioDb));

    });

});


module.exports = router;