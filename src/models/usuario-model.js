const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} no es un rol válido.'
};

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        uppercase: true,
        required: [true, 'El nombre es un campo obligatorio']
    },
    apellidos: {
        uppercase: true,
        type: String
    },
    email: {
        type: String,
        unique: true //correo electronico como unico
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    fechacreated: {
        type: Date,
        default: Date.now()
    },
    fechamodified: {
        type: Date,
        default: Date.now()
    }
});

//ocultando la contraseña en la respuesta

usuarioSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
};
//====== validaciones y formato para retorno json ============//
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} (Duplicado) debe de ser único' });

//exportando el schema de usuarios
module.exports = mongoose.model('Usuarios', usuarioSchema);