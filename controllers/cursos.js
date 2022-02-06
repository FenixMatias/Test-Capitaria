const { response, request } = require('express');
const { Curso } = require('../models');

//obtener cursos - paginado - total - populate
const cursosGet = async(req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;

    const [ total, cursos ] = await Promise.all([
        Curso.countDocuments(),
        Curso.find()
            .populate('profesor', 'rut nombre apellido_paterno apellido_materno')
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        cursos
    });
};

//obtener curso por id - populate
const cursoGetId = async(req = request, res = response) => {

    const { id } = req.params;
    const curso = await Curso.findById(id)
                            .populate('profesor', 'rut nombre apellido_paterno apellido_materno');
    

    res.json(curso);
};

//crear curso
const cursoPost = async(req = request, res = response) => {

    const {...body} = req.body;
    const nombre_curso = req.body.nombre_curso.toUpperCase();
    const cursodb = await Curso.findOne({nombre_curso});

    if (cursodb) {
        return res.status(400).json({
            msg: `El curso ${cursodb.nombre_curso}, ya existe`
        });
    }

    //generar la data a guardar
    const data = {
        ...body,
        nombre_curso: body.nombre_curso.toUpperCase()
    }

    const curso = new Curso(data);

    //guardar en db
    await curso.save();
    
    res.status(201).json({
        msg: ` ${curso} agregado`
    });
};

//actualizar curso
const cursoPut = async(req = request, res = response) => {

    const {id} = req.params;
    const {...data} = req.body;

    const curso = await Curso.findByIdAndUpdate(id, data, {new: true});

    res.json({
        msg: ` ${curso} actualizado`
    });
}

//eliminar curso
const cursoDelete = async(req = request, res = response) => {

    const { id } = req.params;

    const curso = await Curso.findByIdAndDelete(id);

    res.json({
        msg: ` ${curso} eliminado`
    });
};

module.exports = {
    cursosGet,
    cursoGetId,
    cursoPost,
    cursoPut,
    cursoDelete
}