'use strict'

var express = require('express');
const { saveProject, getProjet } = require('../controllers/project');

var projectController = require('../controllers/project');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './upload'});

router.get('/home', projectController.home);
router.post('/test', projectController.test);
router.post('/save-project', projectController.saveProject);
router.get('/project/:id?', projectController.getProjet);
router.get('/projects', projectController.getProjects);
router.put('/project/:id', projectController.updateProject);
router.delete('/project/:id', projectController.deleteProject);
router.post('/upload-image/:id',multipartMiddleware, projectController.uploadImage);
router.get('/get-image/:image', projectController.getImageFile);

module.exports = router;