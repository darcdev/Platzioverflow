const Joi = require('@hapi/joi');

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
        options: {
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().required(),
                    name: Joi.string().required().min(3),
                    password: Joi.string().required().min(6)
                })
            }
        },
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