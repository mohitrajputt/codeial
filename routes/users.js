const express = require('express');
const router = express.Router();
const passport = require('passport');

const users_controller = require('../controllers/users');

router.get('/auth', users_controller.auth);

router.get('/profile', passport.checkAuthentication ,users_controller.profile);

router.post('/signup', users_controller.signUp);

// router.post('/signin', users_controller.signIn);

// Using passport
router.post('/signin', passport.authenticate(
    'local',{
        failureRedirect: '/user/auth'
    },
), users_controller.signIn);

router.get('/signout', users_controller.signOut);

module.exports = router;