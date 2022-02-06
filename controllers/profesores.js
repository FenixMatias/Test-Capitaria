const { response, request } = require('express');
const { Profesor } = require('../models');

//crear profesor
const profesorPost = async(req = request, res = response) => {

    const {...body} = req.body;
    const rut = req.body.rut;
    const profesordb = await Profesor.findOne({rut});

    if (profesordb) {
        return res.status(400).json({
            msg: `El rut ${profesordb.rut}, ya existe`
        });
    }

    //generar la data a guardar
    const data = {
        ...body,
        rut: body.rut
    }

    const profesor = new Profesor(data);

    //guardar en db
    await profesor.save();
    
    res.status(201).json(profesor);
};

module.exports = {
    profesorPost
}