function register(req, h) {
    return h.view('register', {
        title: 'Register'
    })
}

function createUser(req, h) {
    console.log(req.payload);
    return 'Usuario Creado';
}

module.exports = {
    register: register,
    createUser: createUser
}