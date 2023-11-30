const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.post).then( (post) => {
        Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        }).then( (comment) => {
            post.comments.push(comment);
            post.save();

            res.redirect('/');
        } )
    }).catch( (err) => {
        console.log('error while creating comment',err);
        return
    })
}

module.exports.delete = function(req, res) {
    Comment.findById(req.params.id).then((comment) => {
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.deleteOne().then(() => {
                return Post.findByIdAndUpdate(
                    postId,
                    {
                        $pull: {
                            comments: req.params.id
                        }
                    }
                );
            }).then(() => {
                return res.redirect('back');
            }).catch((err) => {
                console.log(err);
                return res.status(500).send('Internal Server Error');
            });
        } else {
            return res.redirect('back');
        }
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    });
};