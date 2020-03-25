const Redis = require("ioredis");

const cfg = require('../config/configuration');
const helper = require('../helpers/redis-helper');
const uHttp = require('../utils/utils-http');
const diaEnSegundos = 86400;
const diasExpiracion = 60;
var moment = require("moment");
const uuidv1 = require('uuid').v1;
//=============================================================//
//=== servicio redis para el almacenamiento temporal de data===//
//=============================================================//

const creacliente = async() => {
    if (cfg.ENVIROMENT.env == 'DEV') {
        console.log("======================================================");
        console.log("=========== BD REDIS EN DESARROLLO ===================");
        console.log("======================================================");
        const redis = new Redis({
            port: cfg.SERVICIOREDIS.portRedis, // Redis port
            host: cfg.SERVICIOREDIS.hostRedis, // Redis host
            family: 4, // 4 (IPv4) or 6 (IPv6)
            // password: cfg.SERVICIOREDIS.passwordRedis,
            db: 0
        })

        // var redisClient = redis.createClient({ port: cfg.SERVICIOREDIS.portRedis, host: cfg.SERVICIOREDIS.hostRedis });

        redis.select(cfg.SERVICIOREDIS.bdredis, function() {
            console.log("redis está apuntando a BD: " + cfg.SERVICIOREDIS.bdredis);
        });

        return redis;

    } else {

        // var redisClient = redis.createClient({ port: cfg.SERVICIOREDIS.portRedis, host: cfg.SERVICIOREDIS.hostRedis });
        console.log("======================================================");
        console.log("=========== BD REDIS EN PRODUCCIÓN ===================");
        console.log("======================================================");
        const redis = new Redis({
            port: cfg.SERVICIOREDIS.portRedis, // Redis port
            host: cfg.SERVICIOREDIS.hostRedis, // Redis host
            family: 4, // 4 (IPv4) or 6 (IPv6)
            password: cfg.SERVICIOREDIS.passwordRedis,
            db: 0
        })

        redis.select(cfg.SERVICIOREDIS.bdredis, function() {
            console.log("redis está apuntando a BD: " + cfg.SERVICIOREDIS.bdredis);
        });
        // =============== descomentar solo si el redis tiene contraseña =======================//
        // var authRedis = clienteRedis.auth(cfg.SERVICIOREDIS.passwordRedis, (error, reply) => {
        //     if (error) {
        //         res({ error: "400", message: "error en autenticación redis." })
        //     }
        //     return reply;
        // });
        // console.log("info redis password -->", authRedis);
        return redis;
    }

};

const guardardataredis = async(req, res) => {

    var clienteRedis = await creacliente();



    //creo un identificador para el registro que se almacenará en redis
    const tempGUID = uuidv1(); // ⇨ '2c5ea4c0-4067-11e9-8b2d-1b9d6bcdbbfd'
    await clienteRedis.hmset(tempGUID, {
        "nombreUsuario": req.body.nombre,
        "apellidosUsuario": req.body.apellidos,
        "fechaCreacion": moment().format("DD-MM-YYYY HH:mm:ss")
    }, (err, reply) => {
        if (err) {
            clienteRedis.quit();
            return res(uHttp.StatusResponseRedis("400", null, "Error al almacenar datos en redis", reply));

        } else {
            if (reply) {
                //asigno fecha de expiración del registro guardado en redis
                clienteRedis.expire(tempGUID, diasExpiracion * diaEnSegundos);
                clienteRedis.quit();
                return res(uHttp.StatusResponseRedis("200", tempGUID, "Datos almacenados en redis", reply));
            }
        }
    });

};

const obtenerregistroredis = async(req, res) => {

    var clienteRedis = await creacliente();
    helper.checkGuidRedis(req.body, clienteRedis, (error, data) => {
        if (error) {
            console.log("error -->", error);
            clienteRedis.quit();
            return res(uHttp.StatusResponseRedis("400", null, "guid no éxiste en la BD redis.", null));
        } else {

            helper.getAllRedis(req.body, clienteRedis, (error, data) => {
                if (error) {
                    return res(uHttp.StatusBodyError("500", error));
                } else {
                    return res(uHttp.StatusResponseRedis("200", req.body.guid, "Registro encontrado.", data));
                }

            });

        }

        res
    });


};

module.exports = {
    guardardataredis,
    obtenerregistroredis,
    creacliente
};