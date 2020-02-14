const router = require('express').Router();
const call = require('../utils/caller-service');
const service = require('../services/usuarios-service');
const uHttp = require('../utils/utils-http');

router.get('/getusers', async(req, res) => {
    try {
        var responseAPI = await service.getDataUsuarios();
        return res
            .status(200)
            .json({response: 'OK', data: responseAPI.body});
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
            .json({status: 200, response: 'OK', data: responseAPIuser.body});

    } catch (error) {
        return res.json(uHttp.StatusBodyError("500", error.message));
    }

});

router.post('/createUser', async(req, res) => {
    try {
        var responseAPIuser = await service.createUsuario(req);

        return res
            .status(201)
            .json({status: 200, response: 'OK', data: responseAPIuser.body});
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
            .json({status: 200, response: 'UPDATE', data: responseAPIuser.body});
    } catch (error) {
        return res.json(uHttp.StatusBodyError("500", error.message));
    }

});

module.exports = router;