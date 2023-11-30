const Post = require('../models/post');

module.exports.home = function(req, res){

    Post.find({}).populate('user').populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    }).then( (content) => {
        return res.render('home', {
            title: 'home',
            post: content
        });
    }).catch( (err) => {
        console.log(err);
        return;
    })

};