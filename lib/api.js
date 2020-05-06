'use strict'

const Joi = require('@hapi/joi');
const { questions } = require('../models/index')
const Boom = require('@hapi/boom')

module.exports = {
    name: 'api-rest',
    version: '1.0.0',
    async register(server, options) {
        const prefix = options.prefix || 'api'

        server.route({
            method: 'GET',
            path: `/${prefix}/question/{key}`,
            options: {
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

        function failValidation(req, h, err) {
            return Boom.badRequest('Por favor use los parametros correctos');
        }
    }
}