const { createUser, getUser, getUserById, updateUser, deleteUser } = require('../controller/user.controller');
const router = require('express').Router();

router.post('/create', createUser);
router.get('/getAll', getUser);
router.get('/get', getUserById);
router.put('/update', updateUser);
router.put('/delete', deleteUser);

module.exports = router;