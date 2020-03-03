//-----------------------------------------------------------------------
// Archivo de configuración, ojo, puede variar.. quizás lo separaremos.. 
// V1.0
//-----------------------------------------------------------------------

module.exports = {
    TITLE: "API CONTROL",
    API_VERSION: "/api/v1",
    puerto: {
        webPort: process.env.PORT || 8080
    },
    //======entorno ==========//
    ENVIROMENT: {
        env: process.env.NODE_ENV || 'DEV'
    },
    //======base de datos ==========//
    CONEXIONBD: {
        desarrolloDB: 'mongodb://localhost:27017/proapinode',
        productionDB: process.env.URI_PRODUCTIONDB
            // productionDB: 'mongodb+srv://jibanez:teba123@pro-api-node-bzxyj.mongodb.net/pro-api-node?retryWrites=true&w=majority'
    }

}