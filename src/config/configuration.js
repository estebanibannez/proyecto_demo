//-----------------------------------------------------------------------
// Archivo de configuración, ojo, puede variar.. quizás lo separaremos.. 
// V1.0
//-----------------------------------------------------------------------

module.exports = {
    TITLE: "DEMO",
    API_VERSION: "/api/v1",
    puerto: {
        webPort: process.env.MD_CH_PORT || process.env.PORT || 8080
    },

}