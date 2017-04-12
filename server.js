'use strict';
const Hapi = require('hapi');
const Path = require('path');

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, '')
            }
        }
    }
});
server.connection({ port: process.env.PORT || 8000 });

server.register(require('inert'), (err) => {
    if (err) {
        throw err;
    }
    server.route({
        method: 'GET',
        path: '/',
        handler: {
            file: Path.join(__dirname, 'public/index.html')
        }
    });
    server.route({
        method: 'GET',
        path: '/scripts/{filename}',
        handler: {
            directory:{
                path:Path.join(__dirname, 'scripts')
            }
        }
    });
    server.route({
        method: 'GET',
        path: '/styles/{filename}',
        handler: { 
            directory: { 
                path: Path.join(__dirname, 'styles') 
            } 
        }
    });
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});


