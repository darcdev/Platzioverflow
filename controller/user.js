const { users } = require('../models/index')
const Boom = require('@hapi/boom');

async function createUser(req, h) {
    let result;
    try {
        result = await users.create(req.payload);
    } catch (e) {
        console.error(e);
        return h.view('register', {
            title: 'Registro',
            error: 'Error creando el usuario'
        });
    }
    return h.view('register', {
        title: 'register',
        success: 'Usuario creado exitosamente'
    });
}

async function validateUser(req, h) {
    let result
    try {
        result = await users.validateUser(req.payload);
        if (!result) {
            return h.view('login', {
                title: 'Login',
                error: 'Email y/o contraseña incorrecta'
            });
        }
    } catch (error) {
        return h.view('login', {
            title: 'Login',
            error: 'Problemas validando el usuario'
        });
    }
    return h.redirect('/').state('user', {
        name: result.name,
        email: result.email
    });
}

function logout(req, h) {
    return h.redirect('/login').unstate('user');
}

function failValidation(req, h, error) {
    const templates = {
        '/create-user': 'register',
        '/validate-user': 'login',
        '/create-question': 'ask'
    }
    return h.view(templates[req.path], {
        title: 'Error de Validacion',
        error: 'Por favor complete los campos requeridos'
    }).code(400).takeover();
}
module.exports = {
    createUser,
    validateUser,
    logout,
    failValidation
}