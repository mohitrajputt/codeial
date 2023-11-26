const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/users');

router.get('/auth', users_controller.auth);

router.post('/signin', users_controller.signIn);
router.post('/signup', users_controller.signUp);
router.get('/profile', users_controller.profile);

module.exports = router;