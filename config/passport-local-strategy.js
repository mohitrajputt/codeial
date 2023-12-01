const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

// Auth using passport

passport.use(new LocalStrategy({
    usernameField: 'username',
    passReqToCallback: true
},
    function (req, username, password, done) {
        User.findOne({
            username: username
        }).then((user) => {
            if (!user || user.password != password) {
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        }).catch((err) => {
            if (err) {
                req.flash('error', err);
                return done(err);
            }
        });
    }
));

// Serializinf
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// Deserializing
passport.deserializeUser(function (id, done) {
    User.findById(id).then((user) => {
        return done(null, user);
    }).catch((err) => {
        console.log('Error in finding user --> Passport');
        return done(err);
    })
})

// Check authenticated
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/user/auth');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;