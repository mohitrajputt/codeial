const Post = require('../models/post');

module.exports.home = async function (req, res) {

    try {
        let content = await Post.find({}).sort('-createdAt').populate('user').populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

        return res.render('home', {
            title: 'home',
            post: content
        });
        
    } catch (error) {
        console.log(error);
        return;
    }

};