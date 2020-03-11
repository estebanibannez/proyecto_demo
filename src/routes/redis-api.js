const express = require('express');
const app = express();
const cfg = require('../config/configuration');
const uHttp = require('../utils/utils-http');
const helper = require('../helpers/redis-helper');
const service = require('../services/redis-service');

app.get('/obtienedataredis', (req, res) => {

    res.send('Hello World!');
    console.log("obtiene Redis Data");
});

app.post('/guardardataredis', async(req, res) => {
    console.log("entra en guardardataredis");
    service.guardardataredis(req, (data) => {

        if (data.code === "400") {
            res.json(uHttp.StatusBodyError("400", error.message))
        }
        if (data.code == "500") {
            res.json(uHttp.StatusBodyError("500", error.message))

        } else {
            console.log("data guardada en redis -->", data);
            res.json(uHttp.StatusBodyOk("200", data.guid))

        }

    });

});

app.post('/obtenerregistroredis', (req, res) => {

    service.obtenerregistroredis(req, (data) => {
        if (data.code == "500") {
            res.json(uHttp.StatusBodyError("500", data.message));
        }
        if (data.code == "400") {
            res.json(uHttp.StatusBodyError("400", data.message));
        } else {
            res.json(uHttp.StatusBodyOk("200", data));
        }

    });

})

module.exports = app;