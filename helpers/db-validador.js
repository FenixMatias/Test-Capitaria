const { Alumno, Region, Comuna, Profesor, Curso, Nota } = require('../models');

const existeEmail = async(email = '') => {
    //Verificar si el correo existe
    const existeEmail = await Alumno.findOne({email});
    if (existeEmail) {
        throw new Error(`El email ${ email }, ya esta registrado`)
    }
}

const existeAlumno = async(id = '') => {
    //Verificar si el id existe
    const existeID = await Alumno.findById(id);
    if (!existeID) {
        throw new Error(`El ID ${ id }, no existe`)
    }
}

const existeProfesor = async(id = '') => {
    //Verificar si el id existe
    const existeID = await Profesor.findById(id);
    if (!existeID) {
        throw new Error(`El ID ${ id }, no existe`)
    }
}

const existeCurso = async(id = '') => {
    //Verificar si el id existe
    const existeID = await Curso.findById(id);
    if (!existeID) {
        throw new Error(`El ID ${ id }, no existe`)
    }
}

const existeRut = async(rut = '') => {
    //Verificar si el rut existe
    const existeRut = await Alumno.findOne({rut});
    if (existeRut) {
        throw new Error(`El rut ${ rut }, ya esta registrado`)
    }
}

const existeComuna = async( id ) => {
    //Verificar si existe la categoria por id
    const existeComuna = await Comuna.findById(id);
    if (!existeComuna) {
        throw new Error(`El ID ${ id }, no existe`)
    }
}

const existeRegion = async( id ) => {
    //Verificar si existe el producto por id
    const existeRegion = await Region.findById(id);
    if (!existeRegion) {
        throw new Error(`El ID ${ id }, no existe`)
    }
}

const existeNotas = async( id ) => {
    //Verificar si existe el producto por id
    const existeNotas = await Nota.findById(id);
    if (!existeNotas) {
        throw new Error(`El ID ${ id }, no existe`)
    }
}

module.exports = {
    existeEmail,
    existeAlumno,
    existeProfesor,
    existeCurso,
    existeNotas,
    existeComuna,
    existeRegion,
    existeRut
}