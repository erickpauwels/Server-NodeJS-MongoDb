'use strict'
// CREACION DE MODELOS 
var mongoose = require('mongoose');

// Molde - se suele usar matusucla para el nombre del modelo / ej  Schema
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
    name:String,
    description: String,
    category: String,
    year:Number,
    langs: String,
    image: String
});

// Exportamops el fichero 
module.exports = mongoose.model('Project', ProjectSchema);
//Projects --> guarda los documentos en la coleccion  