const express = require('express');
const router = express.Router();
const passport = require('passport');

const users_controller = require('../controllers/users');
const forgetController = require('../controllers/forget');

router.get('/auth', users_controller.auth);

router.get('/profile', passport.checkAuthentication ,users_controller.profile);
router.post('/update', passport.checkAuthentication ,users_controller.update);

router.post('/signup', users_controller.signUp);

// router.post('/signin', users_controller.signIn);

// Using passport
router.post('/signin', passport.authenticate(
    'local',{
        failureRedirect: '/user/auth'
    },
), users_controller.signIn);

router.get('/signout', users_controller.signOut);

router.get('/forget', forgetController.forget);

router.get('/auth/google', passport.authenticate('google',{
    scope: ['profile', 'email']
}));

router.get('/auth/google/callback', passport.authenticate('google',{
    failureRedirect: '/users/signin'
}), users_controller.signIn);

module.exports = router;