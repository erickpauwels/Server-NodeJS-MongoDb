
// CREARUN SERVIDOR LOCAL 
//  no es necesario instalar la depencia body-parser aparte, express ya la contiene,

var express = require('express');
// var bodyParser = require('body-parser');

var app = express();

//---------------------- cargar archivos de rutas------------------//

var project_routes = require('./routes/projects');

//-----------------------midlewares-----------------------------------//

// Ya no se usa body parser se utliza lo siguiente 

app.use(express.urlencoded({extended:false}));
app.use(express.json());

//-----------------------------Cors-------------------------------//

// Configurar cabeceras y cors

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
 

//----------------------------Rutas------ ----------------//

// se pasa '/api' como ejemplo puede ir en blanco '/'
app.use('/api', project_routes);

/* app.get('/', (req, res) => {
    res.status(200).send(
        "<h1>Hola mundo desde mi api node js</h1>"
    );
}); */

// Ej con Get
/* app.get('/test', (req, res) => {
    res.status(200).send({
        message:"Hola mundo desde mi api node js"
    });
}); */

// ejemplo con post 
/* app.post('/test/:id', (req, res) => {
    //body para el post guardado desde el 'body' ej con postman
    console.log(req.body.name);
    // query para obtener desdela url se hace elejercicio desde postman ej: http://localhost3800/test?web=google.com
    console.log(req.query.web);
    //params para identificarun parametro ej ID  http://localhost3800/test/88?web=google.com
    console.log(req.params.id);

    res.status(200).send({
        message:"Hola mundo desde mi api node js"
    });
}); */

//---------------------------------exportar---------------------------//

module.exports = app;