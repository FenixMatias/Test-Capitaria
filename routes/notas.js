const { Router } = require('express');
const { check } = require('express-validator');

const { notaPost, notasGet, promedioRojoGet, notaPut, notaDelete } = require('../controllers/notas');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeAlumno, existeCurso, existeNotas } = require('../helpers/db-validador');

const router = Router();

//listar alumnos con sus notas y su promedio final
router.get('/', notasGet);

router.get('/promedio_rojo/', promedioRojoGet);

//crear nota
router.post('/', [
    check('alumno', 'No es un ID válido').isMongoId(),
    check('alumno').custom(existeAlumno),
    check('curso', 'No es un ID válido').isMongoId(),
    check('curso').custom(existeCurso),
    validarCampos
], notaPost);

//actualizar nota
router.put('/:id', [
    check('nota_1', 'La nota es obligatoria').not().isEmpty(),
    check('nota_2', 'La nota es obligatoria').not().isEmpty(),
    check('nota_3', 'La nota es obligatoria').not().isEmpty(),
    check('nota_4', 'La nota es obligatoria').not().isEmpty(),
    check('nota_5', 'La nota es obligatoria').not().isEmpty(),
    check('promedio', 'El promedio es obligatorio').not().isEmpty(),
    check('alumno', 'No es un ID válido').isMongoId(),
    check('alumno').custom(existeAlumno),
    check('curso', 'No es un ID válido').isMongoId(),
    check('curso').custom(existeCurso),
    validarCampos
], notaPut);

//eliminar notas por id
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeNotas),
    validarCampos
], notaDelete);

module.exports = router;