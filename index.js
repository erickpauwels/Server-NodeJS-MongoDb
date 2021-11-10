'use strict'
// Conexion a la base de datos desde node con mongoose 

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;


mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio', { 
    useNewUrlParser:true, 
    useUnifiedTopology: true }
)

.then(()=>{
    console.log("condicion a base de datos esta establecida con exito");
    
    // Creacion del servidor
    app.listen(port, () => {
        console.log("servidor corriedo correctamente url 3800");
    });
})
.catch(error => console.log(error));