const { response, request } = require('express');
const { Nota } = require('../models');

//obtener notas - paginado - total - populate
const notasGet = async(req = request, res = response) => {

    const [ total, notas ] = await Promise.all([
        Nota.countDocuments(),
        Nota.find()
            .populate('alumno', 'rut nombre apellido_paterno apellido_materno')
            .populate('curso', 'nombre_curso')

    ]);

    res.json({
        total,
        notas
    });
};

//obtener promedios rojos - total - populate
const promedioRojoGet = async(req = request, res = response) => {

    const query = { promedio: { $lte: 3.9 } };

    const [ total, notas ] = await Promise.all([
        Nota.countDocuments(query),
        Nota.find(query)
            .populate('alumno', 'rut nombre apellido_paterno apellido_materno')
            .populate('curso', 'nombre_curso')
            
    ]);

    res.json({
        total,
        notas
    });
};

//crear nota
const notaPost = async(req = request, res = response) => {

    const {...body} = req.body;
    const curso = req.body.curso;
    const notadb = await Nota.findOne({curso});

    if (notadb) {
        return res.status(400).json({
            msg: `Ya esta ingresado en el curso ${notadb.curso}`
        });
    }

    //generar la data a guardar
    const data = {
        ...body,
        curso: body.curso
    }

    const nota = new Nota(data);

    //guardar en db
    await nota.save();
    
    res.status(201).json(nota);
};

//actualizar nota
const notaPut = async(req = request, res = response) => {

    const {id} = req.params;
    const {...data} = req.body;

    const nota = await Nota.findByIdAndUpdate(id, data, {new: true});

    res.json({
        msg: ` ${nota} actualizada`
    });
}

//eliminar alumno
const notaDelete = async(req = request, res = response) => {

    const { id } = req.params;

    const nota = await Nota.findByIdAndDelete(id);

    res.json({
        msg: ` ${nota} eliminado`
    });
};

module.exports = {
    notasGet,
    promedioRojoGet,
    notaPost,
    notaPut,
    notaDelete
}