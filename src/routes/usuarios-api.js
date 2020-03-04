// const router = require('express').Router();
const service = require('../services/usuarios-service');
const uHttp = require('../utils/utils-http');
const helper = require('../helpers/usuarios-helper');

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const _ = require('underscore');

app.get('/getusers', async(req, res) => {
    try {
        var responseAPI = await service.getDataUsuarios();
        return res
            .status(200)
            .json({ response: 'OK', data: responseAPI.body });
    } catch (error) {
        return res.json(uHttp.StatusBodyError("500", error.message));
    }

});

app.get('/getuser/:id', async(req, res) => {

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

// app.post('/createuser', async(req, res) => {
//     try {
//         var
//             responseAPIuser = await service.createUsuario(req);
//         return res
//             .status(201).json({
//                 status: 200,
//                 response: 'OK',
//                 data: responseAPIuser.body
//             });
//     } catch (error) {
//         return
//         res.json(uHttp.StatusBodyError("500", error.message));
//     }
// });

app.put('/updateuser/:id', async(req, res) => {
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

app.post('/createuser', (req, res) => {

    var usuario = helper.bodySchemaUsuario(req);
    console.log("entro a usuario create", usuario);
    //grabando usuario en la base de datos
    usuario.save((err, usuarioDb) => {
        if (err) {
            return res
                .status(400)
                .json(uHttp.StatusBodyError("400", err));
        }

        return res.json(uHttp.StatusBodyOk("OK", usuarioDb));

    });

});

app.put('/updateuser/:id', async(req, res) => {
    var id = req.params.id;
    var request = _.pick(req.body, ['nombre', 'apellidos', 'role']);

    try {

        var Usuario = require('../models/usuario-model');

        Usuario.findByIdAndUpdate(id, request, {
            new: true,
            runValidators: true
        }, (err, usuarioDb) => {

            if (err) {
                return res.json(uHttp.StatusBodyError("400", "Ocurrió un error."));
            }
            console.log(Usuario);
            return res
                // .status(200)
                .json({ status: 200, response: 'UPDATE', data: usuarioDb });

        });

    } catch (error) {
        return res.json(uHttp.StatusBodyError("500", error.message));
    }

});

module.exports = app;