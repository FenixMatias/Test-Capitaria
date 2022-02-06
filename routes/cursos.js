const { Router } = require('express');
const { check } = require('express-validator');

const { cursoPost, cursosGet, cursoGetId, cursoPut, cursoDelete } = require('../controllers/cursos');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeProfesor, existeCurso} = require('../helpers/db-validador');

const router = Router();

//listar cursos
router.get('/', cursosGet);

//listar curso por id
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCurso),
    validarCampos,
], cursoGetId);

//crear curso
router.post('/', [
    check('nombre_curso', 'El nombre es obligatorio').not().isEmpty(),
    check('profesor', 'No es un ID válido').isMongoId(),
    check('profesor').custom(existeProfesor),
    validarCampos
], cursoPost);

//actualizar curso
router.put('/:id', [
    check('nombre_curso', 'El nombre es obligatorio').not().isEmpty(),
    check('profesor', 'No es un ID válido').isMongoId(),
    check('profesor').custom(existeProfesor),
    check('id').custom(existeCurso),
    validarCampos
], cursoPut);

//eliminar curso por id
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCurso),
    validarCampos
], cursoDelete);

module.exports = router;