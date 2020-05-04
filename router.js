const site = require('./controller/site');
const user = require('./controller/user');

const routes = [{
        method: 'GET',
        path: '/',
        handler: site.index
    },
    {
        method: 'GET',
        path: '/register',
        handler: user.register
    },
    {
        method: 'POST',
        path: '/create-user',
        handler: user.createUser
    },
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
            }
        }
    }
]

module.exports = routes;