'use strict'

var Project = require('../models/projects');
var fs = require ('fs');  
var path = require ('path');

var controller =  {
    
    home : function (req, res){
        return res.status(200).send({
            message:'soy la home'
        });
    },

    test : function (req, res) {
        return res.status(200).send({
            messge:'soy el metodo o accion test del project'
        });
    },


    //------------------------- SAVE PROJECTS --------------------//

    saveProject : function(req, res){
        var project = new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        //--------- guardar esta base de datos project ------//

        project.save((err, projectStored)=>{
            // se dejan los mensjaes con los codigos de error 
            if(err) return res.status(500).send({message:'Error al guardar el documento'});

            if(!projectStored) return res.status(404).send({message: ' NO se ha podido guardar el proyecto'});

            return res.status(200).send({
                project: projectStored,
                message:'Project Saved'
            });
        });
    },

    //---------------------------- GET PROJECT (ONE)  --------------------//

    getProject: function(req, res){
        var projectId = req.params.id;

        // Al colocar parametro opcional "?" se hace la siguiente condicion "IF" 

        if(projectId == null) return res.status(404).send({message:'El proyecto no existe'});

        Project.findById(projectId, (err, project) =>{

            if(err) return res.status(500).send({message:'error al devolver los datos'});

            if(!project) return res.status(404).send({message:'El proyecto no existe'});

            return res.status(200).send({
                project
            });
        });
    },

    // usar comas "," al aplicar nuevo metodo 

    //---------------------------- GET PROJECTS (ALL OF THEM) --------------------//

    getProjects: function(req,res){
        
        // se puede usar ".find({year:2019})" para pedir algun parametro en particular, 
        // tambien el '.sort' para traer la lista ordenana y agregarle un parametro ej 'year' con '-year' lo organiza de mayor a menor
                //El Exsec es el que genera la promesa
        
        Project.find({}).sort('-year').exec((err, project ) =>{
            if(err) return res.status(500).send({message:'error al traer el documento'});
            if(!project) return res.status(404).send({message:'El proyecto no existe'});

            return res.status(200).send({project});
        });
    },

    //----------------------------UPDTAE PROJECT---------------------------------//

    updateProject: function(req, res){
        
        var projectId = req.params.id;
        var update = req.body;

        // se pasan 4 parametros/ el 3ero es para mostrar el nuevo objeto 'new'

        Project.findByIdAndUpdate(projectId, update, {new:true}, (err,projectUpdated)=>{
            if(err) return res.status(500).send({message:'error al actualizar'});
            if(!projectUpdated) return res.status(404).send({message:'El proyecto no existe'});

            return res.status(200).send({
                project: projectUpdated
            });
        });

    },

//-------------------------DELETE PROJECT---------------------//

    deleteProject: function (req,res){

        var projectId = req.params.id;

        Project.findByIdAndDelete (projectId, (err,projectRemoved) =>{

            if(err) return res.status(500).send({message:'error al borrar'});
            if(!projectRemoved) return res.status(404).send({message:'El proyecto no se puede eliminar'});

            return res.status(200).send({   
                project: projectRemoved
            });

         });
    },  

    //---------------------------------UPLOADS FILES -------------------------------//

    uploadImage: function(req, res){
		var projectId = req.params.id;
		var fileName = "Imagen no subida...";

		if(req.file){
			var filePath = req.file.path;
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			var extSplit = req.file.originalname.split('.');
			var fileExt = extSplit[1];

			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

				Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, projectUpdated) => {
					if(err) return res.status(500).send({message: 'La imagen no se ha subido'});

					if(!projectUpdated) return res.status(404).send({message: 'El proyecto no existe y no se ha asignado la imagen'});

					return res.status(200).send({
						project: projectUpdated
					});
				});

			}else{
				fs.unlink(filePath, (err) => {
					return res.status(200).send({message: 'La extensión no es válida'});
				});
			}

		}else{
			return res.status(200).send({
				message: fileName
			});
		}

	},
    
    getImageFile: function(req, res){
		var file = req.params.image;
		var path_file = `./uploads/${file}`;

		fs.access(path_file,fs.constants.F_OK,(err)=>{
            if(!err){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(200).send({message: "No exisite la imagen"});
            }
        });
	}

    };


module.exports = controller;
