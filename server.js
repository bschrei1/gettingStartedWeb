'use strict';

const Hapi = require('hapi');
const Path = require('path');

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname,'')
            }
        }
    }
});
server.connection({ port: process.env.PORT||8000 });



server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/',
        handler:{
            file: Path.join(__dirname, 'public/index.html')
        }
    });
    
    server.route({
        method: 'GET',
        path: '/scripts/{filename}',
        handler:{
            directory:
                {
                    path: 
                    Path.join(__dirname, 'scripts')
                }
        }
    });
    
    server.route({
        method:'GET',
        path:'/styles/{filename}',
        handler:{directory:{path: Path.join(__dirname, 'styles')}}
    });
    
   /*server.route({
       method: 'GET',
        path: '/hello',   // http://localhost:8000/other.html
         handler: function (request, reply) {
           directory: {
               path: ".",
               listing: false
           }
        }
    });*/
    
    server.route({
        method: 'GET',
        path: '/styles.css',
        handler: {
            file: './styles.css'
        }
    });
    server.route({
        method: 'GET',
        path: '/index.js',
        handler: {
            file: './index.js'
        }
    });
    server.route({
        method: 'GET',
        path: '/node_modules/{filename}',
        handler:{directory:{path: Path.join(__dirname, 'node_modules/')}}
    });
    
    /*server.route({
       method: 'GET',
        path: './styles/*',   // http://localhost:8000/styles/dsjsdjds/style4.css
         handler: function (request, reply) {
           directory: {
               
               path: "styles",
               listing: false
            }
        });*/

      server.route({
        method: 'GET',
        path: '/2',
        handler: function (request, reply) {
//            reply.file('./index.html');
            reply.file("./index2.html");
          
        }
    });
     
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});

/*'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: process.env.PORT ||3000 });

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});*/

