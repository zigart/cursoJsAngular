'use strict'

var express = require('express');
var projectRoutes = require('./routes/project');
var app = express();

//cargar archivos de rutas


//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});




//rutas

app.use('/api', projectRoutes);

//exports

module.exports = app;