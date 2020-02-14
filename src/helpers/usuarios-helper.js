//formateo el body del post
const bodyCreateUsuario = (req) => {

    var body = {
        name: req.body.name,
        job: req.body.job,
    }

    return body;
};


module.exports = {
    bodyCreateUsuario,
};