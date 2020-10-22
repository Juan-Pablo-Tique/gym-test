const { Router } = require('express');
const router = Router();

const { registerUser, branchList, documentTypesList } = require('../controllers/user.controller');

// ============================
// ROUTAS PARA LOS USUARIOS
// ============================
router.post('/register', registerUser);
router.get('/user/branchOffices', branchList);
router.get('/user/document_types', documentTypesList);

module.exports = router;