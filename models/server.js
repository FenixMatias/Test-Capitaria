const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            regiones: '/api/regiones',
            comunas: '/api/comunas',
            alumnos: '/api/alumnos',
            profesores: '/api/profesores',
            cursos: '/api/cursos',
            notas: '/api/notas'

        }

        //Conecta a base de datos
        this.conectarDB();

        //Middleware
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();

    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        //Cors
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));


    }

    routes() {

        this.app.use(this.paths.regiones, require('../routes/regiones'));
        this.app.use(this.paths.comunas, require('../routes/comunas'));
        this.app.use(this.paths.alumnos, require('../routes/alumnos'));
        this.app.use(this.paths.profesores, require('../routes/profesores'));
        this.app.use(this.paths.cursos, require('../routes/cursos'));
        this.app.use(this.paths.notas, require('../routes/notas'));

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`Servidor correindo en el puerto: ${this.port}`)
        });
        
    }

};

module.exports = Server;