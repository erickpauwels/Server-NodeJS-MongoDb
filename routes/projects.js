'use strict'

var express = require('express');

var ProjectController = require('../controllers/projects');

var router = express.Router();

var multipart = require('connect-multiparty');

var multipartMiddleware = multipart({ uploadDir: './uploads' });

// se configura un middleware - esto es una accion que se ejecuta antes del METODO 
//-------------------------------MULTER--------------------------------------//

var crypto = require('crypto');
var multer = require('multer');

const storage = multer.diskStorage({

  destination(req, file, cb) {
    cb(null, './uploads');
  },

  filename(req, file = {}, cb) {

    const { originalname } = file;
    const fileExtension = (originalname.match(/\.+[\S]+$/ || []) [0]);

    crypto.pseudoRandomBytes(16, function (err, raw) {

      cb(null, raw.toString('hex') + Date.now() + fileExtension);

    });

  },

});

// Creo una variable que redirecciona los files para guardarlos en una carpeta 
var mul_upload = multer({dest:'./uploads', storage});

//------------------------------ ROUTES ---------------------------------------//

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save_project', ProjectController.saveProject);
// se coloca "?" para determinar que es un parametro opcional y no obligatorio
router.get('/project/:id', ProjectController.getProject);
// ruta para  traer todos los documentos 
router.get('/projects', ProjectController.getProjects);
// Se utiliza el metodo PUT para actualizar
router.put('/project/:id', ProjectController.updateProject);
// Eliminar documento con "DELETE"
router.delete('/project/:id', ProjectController.deleteProject);
// Subir archivos o imagenes , 'POST'
router.post('/upload_image/:id', mul_upload.single('image'), /* multipartMiddleware, */ ProjectController.uploadImage);
router.get('/get_image/:image', ProjectController.getImageFile);

module.exports = router;