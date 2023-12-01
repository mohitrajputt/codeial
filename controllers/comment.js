const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){

    let post = await Post.findById(req.body.post);

    let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id
    });
    
    post.comments.push(comment);
    
    post.save();
    
    req.flash('success','Comment published!');
    res.redirect('/');

}

module.exports.delete = async function(req, res) {

    let comment = await Comment.findById(req.params.id)
    
    if (comment.user == req.user.id) {

        let postId = comment.post;

        await comment.deleteOne();
        
        await Post.findByIdAndUpdate(
            postId,
            {
                $pull: {
                    comments: req.params.id
                }
            }
        );

        req.flash('success','Comment deleted!');
        return res.redirect('back');

    } else {
        req.flash('success','User not allowed to delete this post!');
        return res.redirect('back');
    }


};