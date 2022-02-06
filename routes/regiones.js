const { Router } = require('express');
const { check } = require('express-validator');

const { regionPost } = require('../controllers/regiones');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//crear region
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], regionPost);

module.exports = router;