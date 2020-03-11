'use strict'
//revisa si existe el item en la BD
const checkGuidRedis = function(item, redisClient, callback) {
    console.log("....____....");
    console.log(item.guid.toString());
    redisClient.exists(item.guid.toString(), function(err, exists) {
        if (err) {
            return callback(err);
        }
        if (parseInt(exists.toString()) === 1) {
            return callback(null, true);
        } else {
            return callback(null, false);
        }
    });
};


//trae todos los atributos del item
const getAllRedis = function(item, redisClient, callback) {
    console.log(`======== GUID : ${item.guid} ===========`);
    redisClient.hgetall(item.guid.toString(), function(err, dataencontrada) {

        if (err) {
            console.log("error getAllRedis -->", err);
            return callback(err);
        }
        if (dataencontrada) {

            var registroRedis = dataencontrada;
            console.log("Registro encontrado -->", registroRedis);
            // registroRedis.guid = item; //seteo identificador guid
            return callback(null, registroRedis);
        } else {
            return callback(null, null);
        }

    });
}

module.exports = {
    checkGuidRedis,
    getAllRedis
};