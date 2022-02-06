const { response, request } = require('express');
const { Alumno } = require('../models');

//obtener alumnos - paginado - total - populate
const alumnostGet = async(req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;

    const [ total, alumnos ] = await Promise.all([
        Alumno.countDocuments(),
        Alumno.find()
            .populate('comuna', 'nombre')
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        alumnos
    });
};

//obtener alumno por id - populate
const alumnoGetId = async(req = request, res = response) => {

    const { id } = req.params;
    const alumno = await Alumno.findById(id)
                            .populate('comuna', 'nombre');
    

    res.json(alumno);
};

//crear alumno
const alumnoPost = async(req = request, res = response) => {

    const {...body} = req.body;
    const rut = req.body.rut;
    const alumnodb = await Alumno.findOne({rut});

    if (alumnodb) {
        return res.status(400).json({
            msg: `El rut ${alumnodb.rut}, ya existe`
        });
    }

    //generar la data a guardar
    const data = {
        ...body,
        rut: body.rut
    }

    const alumno = new Alumno(data);

    //guardar en db
    await alumno.save();
    
    res.status(201).json({
        msg: ` ${alumno} agregado`
    });
};

//actualizar alumno
const alumnoPut = async(req = request, res = response) => {

    const {id} = req.params;
    const {...data} = req.body;

    const alumno = await Alumno.findByIdAndUpdate(id, data, {new: true});

    res.json({
        msg: ` ${alumno} actualizado`
    });
}

//eliminar alumno
const alumnoDelete = async(req = request, res = response) => {

    const { id } = req.params;

    const alumno = await Alumno.findByIdAndDelete(id);

    res.json({
        msg: ` ${alumno} eliminado`
    });
};

module.exports = {
    alumnostGet,
    alumnoGetId,
    alumnoPost,
    alumnoPut,
    alumnoDelete
}