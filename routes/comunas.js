const { Router } = require('express');
const { check } = require('express-validator');

const { comunaPost } = require('../controllers/comunas');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeRegion} = require('../helpers/db-validador');

const router = Router();

//crear region
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('region', 'No es un ID válido').isMongoId(),
    check('region').custom(existeRegion),
    validarCampos
], comunaPost);

module.exports = router;