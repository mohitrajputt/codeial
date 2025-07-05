const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');

passport.use(new googleStrategy({
        clientID:  process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:8000/user/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done){
        // Find an user
        User.findOne({username: profile.displayName}).then( (user) => {
            // if (err){console.log('error in google strategy-passport', err); return;}
            console.log(profile);

            if (user){
                // if found, set this user as req.user
                return done(null, user);
            }else{
                // if not found, create the user and set it as req.user
                User.create({
                    username: profile.displayName,
                    // email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }).then( (user) => {
                    return done(null, user);
                })
                // , function(err, user){
                //     if (err){console.log('error in creating user google strategy-passport', err); return;}

                // });
            }
        })
    }
    )
)

module.exports = passport;
