const tokenMask = (req) => {
    var body = {
        status: "200",
        usuario : req,
        token : "1234563"
    };

    return body;

};


module.exports = {
    tokenMask
};