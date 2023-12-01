const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    });
    req.flash('success','Post published!');
    return res.redirect('back');
}

module.exports.delete = async function(req, res) {

    let post = await Post.findById(req.params.id);
    
    if (post.user == req.user.id) {
        await post.deleteOne();
        await Comment.deleteMany({ post: req.params.id });
        req.flash('success','Post deleted!');
        return res.redirect('back');
    }
    else {
        req.flash('success','User not allowed to delete this post!');
        return res.redirect('back');
    }
};