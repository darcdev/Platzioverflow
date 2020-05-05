const { users } = require('../models/index')

async function createUser(req, h) {
    let result;
    try {
        result = await users.create(req.payload);
    } catch (e) {
        console.error(e);
        return h.response('Problemas creando el usuario').code(500);
    }
    return h.response(`Usuario Creado ID', ${result}`);
}

async function validateUser(req, h) {
    let result
    try {
        result = await users.validateUser(req.payload);
        if (!result) {
            return h.response('Email y/o contraseña incorrecta').code(401);
        }
    } catch (error) {
        console.error(error);
        return h.response('Problemas al logear el usuario').code(500);
    }
    return h.redirect('/').state('user', {
        name: result.name,
        email: result.email
    });
}

function logout(req, h) {
    return h.redirect('/login').unstate('user');
}

module.exports = {
    createUser,
    validateUser,
    logout
}