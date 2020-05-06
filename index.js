'use strict'

const Hapi = require('@hapi/hapi');
const handlebars = require('./lib/helpers');
const inert = require('@hapi/inert');
const method = require('./lib/methods');
const path = require('path');
const vision = require('@hapi/vision')

handlebars.registerHelper('answerNumber', (answers) => {
    const keys = Object.keys(answers);
    return keys.length;
})

const routes = require('./router');
const site = require('./controller/site');

const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost',
    routes: {
        files: {
            relativeTo: path.join(__dirname, 'public')
        }
    },
})
async function init() {
    try {
        await server.register(inert);
        await server.register(vision);
        server.method('setAnswerRight', method.setAnswerRight)
        server.state('user', {
            ttl: 1000 * 60 * 60 * 24 * 7,
            isSecure: process.env.NODE_ENV === 'prod',
            encoding: 'base64json'
        })
        server.views({
            engines: {
                hbs: handlebars
            },
            relativeTo: __dirname,
            path: 'views',
            layout: true,
            layoutPath: 'views'
        })
        server.ext('onPreResponse', site.fileNotFound)
        server.route(routes);
        await server.start();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
    console.log(`Servidor lanzado en: ${server.info.uri}`);
}

process.on('unhandledRejection', (error) => {
    console.log('UnhandledRejection', error.message, error);
});

process.on('uncaughtException', (error) => {
    console.log('uncaugthException', error.message, error);
})

init();