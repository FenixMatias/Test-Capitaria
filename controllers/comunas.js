const { response, request } = require('express');
const { Comuna } = require('../models');

//crear comuna
const comunaPost = async(req = request, res = response) => {

    const {...body} = req.body;
    const nombre = req.body.nombre.toUpperCase();
    const comunadb = await Comuna.findOne({nombre});

    if (comunadb) {
        return res.status(400).json({
            msg: `La comuna ${comunadb.nombre}, ya existe`
        });
    }

    //generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase()
    }

    const comuna = new Comuna(data);

    //guardar en db
    await comuna.save();
    
    res.status(201).json(comuna);
};

module.exports = {
    comunaPost
}