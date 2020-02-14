const router = require('express').Router();
const call = require('../utils/caller-service');
const service = require('../services/usuario-service');

router.get('/getusers', async (req, res) => {
    //var responseAPI = await call.callRESTHelper('https://reqres.in/api/users', 'GET')
    var responseAPI =  await service.getDataUsuarios();

    console.log("entra a getUsers", responseAPI);
    return res
        .status(200)
        .json({user: 'entro a usuario', data: 'data'});

});

router.post('/sendUsers', (req, res) => {

    return res.json('send users');

});

router.put('/updateUser/:id', (req, res) => {
    let id = req.params.id;
    return res.json({id});

});

module.exports = router;