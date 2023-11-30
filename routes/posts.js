const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../controllers/post');

router.post('/create', passport.checkAuthentication ,postController.create);
router.get('/delete/:id', passport.checkAuthentication ,postController.delete);

module.exports = router;