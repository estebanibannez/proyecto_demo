'use strict'

const sc = require('../utils/caller-service');

const buildArgsForRequest = (requestBody) => {
    var argsForRequest = {
        header: sc.callCreateHeader("User", "0.0.0.0", "10", "TESTKI"),
        body: requestBody
    }
    return argsForRequest;
};

const StatusBodyOk = (code, body) => {
    var statusBody = {
        header: {
            code: code,
            status: 200
        },
        body: body
    };
    return statusBody;
};

const StatusBodyOkToken = (code, body, token) => {
    var statusBody = {
        header: {
            code: code,
            status: 200,
            token: token
        },
        body: body
    };
    return statusBody;
};

const StatusBodyError = (code, message) => {
    var statusBody = {
        header: {
            code: code,
            status: "error",
            message: message
        },
        body: {}
    };
    return statusBody;
}


const StatusResponseGoogle = (code, message, usuario) => {
    var statusBody = {
        header: {
            code: code,
            status: "error",
            message: message
        },
        body: {
            usuario: usuario
        }
    };
    return statusBody;
}
const StatusResponseRedis = (code, guid, message, res) => {
    var body = {
        code: code,
        guid: guid,
        message: message,
        data: res
    };

    return body;

};

module.exports = {
    buildArgsForRequest,
    StatusBodyOk,
    StatusBodyOkToken,
    StatusBodyError,
    StatusResponseGoogle,
    StatusResponseRedis
}