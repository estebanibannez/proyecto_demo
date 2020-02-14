'use strict'

// requires

const call = require('../utils/caller-service');

const getDataUsuarios = async(req) => {

    // var obj = {     "email": "eve.holt@reqres.in",     "password": "pistol" }
    console.log(req);

    var responseApi = await call.callRESTHelper('https://reqres.in/api/users', 'GET');

    return responseApi;
};

module.exports = {
    getDataUsuarios

};