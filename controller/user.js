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

function login(req, h) {
    return h.view('login', {
        title: 'Login'
    })
}
async function validateUser(req, h) {
    try {
        const userLogin = await users.validateUser(req.payload);
        return userLogin;
    } catch (error) {
        console.error(error);
        return h.response('Problemas al logear el usuario').code(500);
    }
}

module.exports = {
    register,
    createUser,
    login,
    validateUser
}