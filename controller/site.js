function index(req, h) {
    return h.view('index', {
        title: 'home',
        user: req.state.user
    })
}

function register(req, h) {
    return h.view('register', {
        title: 'Register',
        user: req.state.user
    })
}

function login(req, h) {
    return h.view('login', {
        title: 'Login',
        user: req.state.user

    })
}
module.exports = {
    index,
    register,
    login
}