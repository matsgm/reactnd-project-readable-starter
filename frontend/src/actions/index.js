import * as APIUtil from '../utils/api_util'

export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const TOGGLE_SORT = 'TOGGLE_SORT'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export const fetchPosts = () => dispatch => {
    //console.log('fetch posts')
    return APIUtil
        .fetchPosts()
        .then(posts => {
            // Create an object, postsbyId, which contains which sets the [elem.id] of the object to "elem"
            let postsbyId = posts.reduce( (acc, elem) => {
                acc[elem.id] = elem
                return acc
            }, {})

            // Returns all IDs as an array
            let allPosts = posts.map( post => {
                return post.id
            })

            // Combines the object and array to a new object
            let postsObj = {
                byId: postsbyId,
                allIds: allPosts
            }

            dispatch(receivePosts(postsObj))
        })
}

export const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
})

export const fetchComments = (id) => dispatch => {
    //console.log('fetch comments')
    return APIUtil
        .fetchComments(id)
        .then(comments => {
            if (comments.length > 0) {
                let commentsbyId = comments.reduce( (acc, elem) => {
                    acc[elem.id] = elem
                    return acc
                }, {})

                let allComments = comments.map( comment => {
                    return comment.id
                })

                let commentsObj = {
                    byId: commentsbyId,
                    allIds: allComments
                }

                dispatch(receiveComments(commentsObj))
            } else {
                let commentsObj = {
                    byId: {},
                    allIds: []
                }

                dispatch(receiveComments(commentsObj))
            }
        })
}

export const receiveComments = comments => ({
    type: RECEIVE_COMMENTS,
    comments
})

export const fetchCategories = () => dispatch => {
    //console.log('fetch categories')
    return APIUtil
        .fetchCategories()
        .then( categories => {
            dispatch(receiveCategories(categories))
        })
}

export const receiveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    categories
})

export const votePost = (id, vote) => dispatch => {
    //console.log("vote post")
    return APIUtil
        .votePost(id, vote)
        .then( (post) => {
            dispatch(updatePost(post))
        })
}

// Reused when updating posts from different action (vote, edit)
export const updatePost = post => ({
    type: UPDATE_POST,
    post
})

export const toggleSort = sortBy => ({
    type: TOGGLE_SORT,
    sortBy
})

export const addPost = (postObj) => dispatch => {
    return APIUtil
        .addPost(postObj)
        .then( newPost => {
            //console.log(`New post`, newPost)
            dispatch(addPostToStore(newPost))
        })
}

export const addPostToStore = newPost => ({
    type: ADD_POST,
    newPost
})

export const editPost = (postObj, id) => dispatch => {
    return APIUtil
        .editPost(postObj, id)
        .then( post => {
            dispatch(updatePost(post))
        })
}

export const deletePost = id => dispatch => {
    return APIUtil
        .deletePost(id)
        .then(post=> {
            dispatch(deletePostFromStore(post))
        })
}

export const deletePostFromStore = post => ({
    type: DELETE_POST,
    post
})

export const voteComment = (id, vote) => dispatch => {
    //console.log("vote comment")
    return APIUtil
        .voteComment(id, vote)
        .then( (comment) => {
            dispatch(updateComment(comment))
        })
}

// Reused when updating posts from different action (vote, edit, delete)
export const updateComment = comment => ({
    type: UPDATE_COMMENT,
    comment
})

export const editComment = (commentObj, id) => dispatch => {
    return APIUtil
        .editComment(commentObj, id)
        .then(comment => {
            dispatch(updateComment(comment))
        })
}

export const addComment = commentObj => dispatch => {
    return APIUtil
        .addComment(commentObj)
        .then(newComment => {
            dispatch(addCommentToStore(newComment))
        })
}

export const addCommentToStore = newComment => ({
    type: ADD_COMMENT,
    newComment
})

export const deleteComment = id => dispatch => {
    return APIUtil
        .deleteComment(id)
        .then(comment => {
            dispatch(deleteCommentFromStore(comment))
        })
}

export const deleteCommentFromStore = comment => ({
    type: DELETE_COMMENT,
    comment
})