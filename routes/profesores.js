const { Router } = require('express');
const { check } = require('express-validator');

const { profesorPost } = require('../controllers/profesores');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeEmail, existeComuna, existeRut } = require('../helpers/db-validador');

const router = Router();

//crear profesor
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
], profesorPost);

module.exports = router;