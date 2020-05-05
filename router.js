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
        handler: site.register
    },
    {
        path: '/create-user',
        method: 'POST',
        options: {
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().required(),
                    name: Joi.string().required().min(3),
                    password: Joi.string().required().min(6)
                }),
                failAction: user.failValidation
            }
        },
        handler: user.createUser
    },
    {
        method: 'GET',
        path: '/login',
        handler: site.login
    },
    {
        method: 'GET',
        path: '/logout',
        handler: user.logout
    },
    {
        path: '/validate-user',
        method: 'POST',
        options: {
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().required(),
                    password: Joi.string().required().min(6)
                }),
                failAction: user.failValidation
            }
        },
        handler: user.validateUser
    },
    {
        method: 'GET',
        path: '/assets/{param*}',
        handler: {
            directory: {
                path: '.',
                index: ['index.html']
            }
        }
    },
    {
        method: ['GET', 'POST'],
        path: '/{any*}',
        handler: site.notFound
    }
]

module.exports = routes;