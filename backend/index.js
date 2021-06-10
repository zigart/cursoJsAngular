'use strict'

var mongoose = require('mongoose');
const app = require('./app');
var port = 3700;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/portfolio',{ useNewUrlParser:true, useUnifiedTopology: true }
)
    .then(()=>{
        console.log("conexion a la base de datos establecida con exito");

        //creacion del servidor
        app.listen(port,()=>{
            console.log('server corriendo en localhost:3700');
        });
    })
    .catch((err)=>{
        console.log(err);
    })