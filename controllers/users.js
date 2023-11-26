const User = require('../models/users');

module.exports.profile = function (req, res) {
    if (req.cookies.user_id) {

        User.findById(req.cookies.user_id).then((user) => {
            return res.render('profile', {
                title: "User Profile",
                user: user
            })
        }).catch((err) => {
            console.log("Error to fetch user");
            return;
        });
    }
    else { 
        return res.redirect('/user/auth');
    }
}

module.exports.auth = function (req, res) {
    return res.render('auth', {
        title: 'Authentication'
    });
}

module.exports.signUp = function (req, res) {

    if (req.body.password != req.body.confirmPassword) {
        console.log('Password does not match with confirm password');
        return res.redirect('back');
    }

    User.create(req.body).then((user) => {
        console.log('SignUp');
        return res.redirect('/user/profile');
    }).catch((err) => {
        console.log('Error in creating user', err);
        return;
    })

}

module.exports.signIn = function (req, res) {


    User.findOne({
        username: req.body.username
    }).then((user) => {
        if (user.password == req.body.password) {
            res.cookie('user_id', user.id);
            console.log('SignIn');
            return res.redirect('/user/profile');
        }
        console.log('Password is wrong');
        return res.redirect('back');
    }).catch((err) => {
        console.log('Error in finding user', err);
        return;
    });
}