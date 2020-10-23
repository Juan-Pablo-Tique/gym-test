const { Router } = require('express');
const router = Router();

const { isLoggedIn } = require('../lib/auth');
const { addCity, addBrandOffices, getUserList } = require('../controllers/admin.controller');

// ============================
// ROUTAS PARA LOS ADMIN
// ============================
router.post('/admin/createCity', isLoggedIn, addCity);
router.post('/admin/createBranch', isLoggedIn, addBrandOffices);
router.get('/admin/userList', isLoggedIn, getUserList);

module.exports = router;