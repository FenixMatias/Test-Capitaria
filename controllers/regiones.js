const { response, request } = require('express');
const { Region } = require('../models');

//crear region
const regionPost = async(req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const regiondb = await Region.findOne({nombre});

    if (regiondb) {
        return res.status(400).json({
            msg: `La region ${regiondb.nombre}, ya existe`
        });
    }

    //generar la data a guardar
    const data = {
        nombre
    }

    const region = new Region(data);

    //guardar en db
    await region.save();
    
    res.status(201).json(region);
};

module.exports = {
    regionPost
}