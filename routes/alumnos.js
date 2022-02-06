const { Router } = require('express');
const { check } = require('express-validator');

const { alumnoPost, alumnostGet, alumnoGetId, alumnoPut, alumnoDelete } = require('../controllers/alumnos');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeEmail, existeComuna, existeRut, existeAlumno } = require('../helpers/db-validador');

const router = Router();

//listar alumnos
router.get('/', alumnostGet);

//listar alumno por id
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeAlumno),
    validarCampos,
], alumnoGetId);

//crear alumno
router.post('/', [
    check('rut', 'El rut es obligatorio').not().isEmpty(),
    check('rut').custom(existeRut),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido_paterno', 'El apellido_paterno es obligatorio').not().isEmpty(),
    check('apellido_materno', 'El apellido_materno es obligatorio').not().isEmpty(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    check('direccion', 'La direccion es obligatoria').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(existeEmail),
    check('comuna', 'No es un ID válido').isMongoId(),
    check('comuna').custom(existeComuna),
    validarCampos
], alumnoPost);

//actualizar alumno por id
router.put('/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido_paterno', 'El apellido_paterno es obligatorio').not().isEmpty(),
    check('apellido_materno', 'El apellido_materno es obligatorio').not().isEmpty(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    check('direccion', 'La direccion es obligatoria').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('comuna', 'No es un ID válido').isMongoId(),
    check('comuna').custom(existeComuna),
    check('id').custom(existeAlumno),
    validarCampos
],alumnoPut);

//eliminar alumno por id
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeAlumno),
    validarCampos
], alumnoDelete);

module.exports = router;