const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    });
    return res.redirect('back');
}

module.exports.delete = function(req, res) {
    Post.findById(req.params.id).then( (post) => {
        if(post.user == req.user.id){
            post.deleteOne().then( () => {
                Comment.deleteMany({post: req.params.id});
                return res.redirect('back');
            })
        }
        else{
            return res.redirect('back');
        }
    }).catch( (err) => {
        console.log(err);
        return;
    })
};