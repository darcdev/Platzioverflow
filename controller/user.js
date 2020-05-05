const { users } = require('../models/index')

function register(req, h) {
    return h.view('register', {
        title: 'Register'
    })
}

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


module.exports = {
    register: register,
    createUser: createUser
}