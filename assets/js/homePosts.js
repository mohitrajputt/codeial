{
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            // To send data manually
            e.preventDefault();

            $.ajax({
                type: 'post', // get,post,put
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('.show-posts>ul').prepend(newPost);
                    deletePost($('.delete-post-button',newPost));
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    let newPostDom = function(post){
        return $(`<li id="post-${ post._id}" >
        <div class="delete">
                <a class="delete-post-button" href="/posts/delete/${ post._id }">X</a>
        </div>
        <h4 class="user-content">${ post.content }</h4>
        <h6 class="user">Posted by ${ post.user.username }</h6>

        <!-- Post comment -->
        <div class="post-comment">
                <form action="/comments/create" method="post">
                    <input type="text" name="content" placeholder="Type here to add comment" required>
                    <input type="hidden" name="post" value="${ post._id }">
                    <input type="submit" value="ADD Comment">
                </form>
        </div>

        <!-- Display comment -->
        <div class="show-comments">
            <ul>
            </ul>
        </div>
    </li>`)
    }

     // method to delete a post from DOM
     let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

    createPost();
}