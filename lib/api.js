'use strict'

const authBasic = require('@hapi/basic');
const Joi = require('@hapi/joi');
const { questions, users } = require('../models/index')
const Boom = require('@hapi/boom')

module.exports = {
    name: 'api-rest',
    version: '1.0.0',
    async register(server, options) {
        const prefix = options.prefix || 'api'

        await server.register(authBasic);
        server.auth.strategy('simple', 'basic', {
            'validate': validateAuth
        })
        server.auth.default('simple');
        server.route({
            method: 'GET',
            path: `/${prefix}/question/{key}`,
            options: {
                auth: 'simple',
                validate: {
                    params: Joi.object({
                        key: Joi.string().required()
                    }),
                    failAction: failValidation
                }
            },
            handler: async(req, h) => {
                let result;
                try {
                    result = await questions.getOne(req.params.key)
                    if (!result) {
                        return Boom.notFound(`No se pudo encontrar la pregunta ${req.params.key}`)
                    }
                } catch (e) {
                    return Boom.badImplementation(`Hubo un error buscando ${req.params.key} - ${e}`)
                }

                return result;
            }
        })
        server.route({
            method: 'GET',
            path: `/${prefix}/questions/{amount}`,
            options: {
                auth: 'simple',
                validate: {
                    params: Joi.object({
                        amount: Joi.number().integer().min(1).max(20).required()
                    }),
                    failAction: failValidation
                }
            },
            handler: async(req, h) => {
                let result;
                try {
                    result = await questions.getLast(req.params.amount)
                    if (!result) {
                        return Boom.notFound(`No se pudo recuperar las preguntas`)
                    }
                } catch (e) {
                    return Boom.badImplementation(`Hubo un error buscando ${req.params.key} - ${e}`)
                }

                return result;
            }
        })

        async function validateAuth(req, username, passwd, h) {
            let user;
            try {
                user = await users.validateUser({
                    email: username,
                    password: passwd
                })
            } catch (e) {
                server.log('error', error);
            }

            return {
                credentials: user || {},
                isValid: (user !== false)
            }
        }

        function failValidation(req, h, err) {
            return Boom.badRequest('Por favor use los parametros correctos');
        }
    }
}