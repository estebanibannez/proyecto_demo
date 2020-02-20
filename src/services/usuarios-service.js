'use strict'
const helper = require('../helpers/usuarios-helper');
const call = require('../utils/caller-service');

const getDataUsuarios = async(req) => {

    var responseApi = await call.callRESTHelper('https://reqres.in/api/users', 'GET');

    return responseApi;
};

const getDataUsuario = async(req) => {
   
    var responseApi = await call.callRESTHelper(`https://reqres.in/api/users/${req}`,'GET');
    // console.log("response API -->",responseApi.body);
    return responseApi;

};

const createUsuario = async (req) => {

    var responseApi = await call.callRESTHelper(`https://reqres.in/api/users/`, 'POST', helper.bodyCreateUsuario(req));
    // console.log("respuesta api...", responseApi.body);
    return responseApi;
};

const updateUsuario = async (id, request) => {
    console.log("id",id);
    console.log("request",request);
    var responseAPi = await call.callRESTHelper(`https://reqres.in/api/users/${id}`, 'PUT', request);
    // console.log("response update -->", responseApi.body);
    return responseAPi;
};

module.exports = {
    getDataUsuarios,
    getDataUsuario,
    createUsuario,
    updateUsuario

};