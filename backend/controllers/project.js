'use strict'

const Project = require('../models/projects');
var fs = require('fs');
var path = require('path');
const { restart } = require('nodemon');
const { constants } = require('buffer');


var controller = {
home: function(req,res){
    return res.status(200).send({
        message: 'soy la home'
    });
}, 

test: function(req,res){
    return res.status(200).send({
        message: 'soy el test del controller project'
    });
},


saveProject: function(req, res){
var project = new Project();

var params = req.body;
project.name = params.name;
project.description = params.description;
project.category = params.category;
project.year = params.year;
project.langs = params.langs;
project.image = null;

project.save((err, projectStored)=>{

    if (err) return res.status(500).send({message:'error al guardar'});
    if (!projectStored) return res.status(404).send({message:'no se pudo guardar el proyecto'});

    return res.status(200).send({project: projectStored});
});

},

getProjet: function(req, res){
    var projectId = req.params.id;

    if (projectId == null) return res.status(404).send({message:'el proyecto no existe'});
    

    Project.findById(projectId, (err, project )=>{
        if (err) return res.status(500).send({message:'error al devolver los datos'});
        if (!project) return res.status(404).send({message:'el proyecto no existe'});
        return res.status(200).send({
            project
        });
    });
},

getProjects: function(req,res){
    Project.find({}).sort('-year').exec((err, projects)=>{
        if(err) return res.status(500).send({message: 'error al devolver los datos'});
        if (!projects) return res.status(404).send({message:'no existen proyectos'});
        return res.status(200).send({projects});
    });
},
updateProject: function(req,res){
    var projectId = req.params.id;
    var update = req.body;

    Project.findByIdAndUpdate(projectId, update, {new: true}, (err, projectUpdated)=>{
        if(err) return res.status(500).send({message: 'error al actualizar'});
        if (!projectUpdated) return res.status(404).send({message:'no existe el proyecto a actualizar'});
        return res.status(200).send({project: projectUpdated});
    });
},
deleteProject: function(req,res){
    var projectId = req.params.id;

    Project.findByIdAndDelete(projectId, (err, projectRemoved)=>{
        if(err) return res.status(500).send({message: 'error eliminar'});
        if (!projectRemoved) return res.status(404).send({message:'no existe el proyecto a eliminar'});
        return res.status(200).send({project: projectRemoved});
    })
},
uploadImage: function(req,res){
    var projectId = req.params.id;
    var fileName = 'Imagen no subida...';

    if(req.files){
        var filePath = req.files.image.path;
        var fileSplit = filePath.split('\\');
        var fileName = fileSplit[1];
        var extSplit = fileName.split('.');
        var fileExt = extSplit[1];

        if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
            Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, projectUpdated)=>{
                if (err) return res.status(500).send({message: "la imagen no se ha subido"});
                if (!projectUpdated) return res.status(404).send({message: "El proyecto no existe y no se ha  asignado la imagen"});
                return res.status(200).send({project: projectUpdated});
            });  
        }else{
            fs.unlink(filePath, (err) =>{
                return res.status(200).send({message: 'la extension no es valida'});
            });
        }
    }else{
         res.status(200).send({message: fileName});
    }
},

getImageFile(req,res){
    var file = req.params.image;
    var path_file = './upload/' + file;
    fs.access(path_file, constants.f_OK,(err)=>{
        if(err){
            return res.status(200).send({message: 'no existe la imagen'});
        }else{
            return res.sendFile(path.resolve(path_file));
        }
    });
}

};
module.exports = controller;