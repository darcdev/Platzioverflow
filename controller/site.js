function index(req, h) {
    return h.view('index', {
        title: 'home'
    })
}
module.exports = {
    index
}