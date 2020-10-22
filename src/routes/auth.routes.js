const { Router } = require('express');
const router = Router();

const { authentication, signUp } = require('../controllers/auth.controller');

// ==================================
// ROUTAS PARA LA AUTHENTIFICACIÓN
// ==================================
router.post('/login', authentication);
router.post('/admin/createNew', signUp);


module.exports = router;