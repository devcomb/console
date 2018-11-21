const express = require('express');
const exegesisExpress = require('exegesis-express');
const http = require('http');
const path = require('path');

async function createServer() {
    // See https://github.com/exegesis-js/exegesis/blob/master/docs/Options.md
    const options = {
        controllers: path.resolve(__dirname, './controllers'),       
        //controllersPattern: "**/*.@(ts|js)",
        allowMissingControllers: false
    };

    // This creates an exgesis middleware, which can be used with express,
    // connect, or even just by itself.
    const exegesisMiddleware = await exegesisExpress.middleware(
        path.resolve(__dirname, './devcomb-openapi-v3.yaml'),
        options
    );

    const app = express();

    // If you have any body parsers, this should go before them.
    app.use(exegesisMiddleware);
    
    app.use('/',express.static('app'));

    app.get('/', function(req, res) {
        res.sendfile('./app/index.html');
    });
    
    // Return a 404
    app.use((req, res, next) => {
        console.log(`Error 404 on ${req.url}.`);
        res.status(404).send({ status: 404, error: 'Not found' });
    });

    // Handle any unexpected errors
    app.use((err, req, res, next) => {
        const status = err.status || 500;
        console.log(`Error ${status} (${err.message}) on ${req.method} ${req.url} with payload ${req.body}.`);
        res.status(status).send({ status, error: 'Server error' });
    });

    const server = http.createServer(app);

    return server;
}

var appPort = Object.is(process.env.APP_PORT, undefined) ? 8080 : process.env.APP_PORT;

createServer()
.then(server => {
    server.listen(appPort);
    console.log("Listening on port "+appPort);
    console.log("Try visiting http://host:"+appPort+"/greet?name=Jason");
})
.catch(err => {
    console.error(err.stack);
    process.exit(1);
});