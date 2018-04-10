import {
  RECEIVE_POSTS,
  RECEIVE_COMMENTS,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  ADD_COMMENT,
  RECEIVE_CATEGORIES,
  UPDATE_POST,
  DELETE_POST,
  ADD_POST,
  TOGGLE_SORT
} from '../actions'
import { combineReducers } from 'redux'
import { sortArrayOfPosts } from '../utils/sort_util'

// TODO: Split and combine reducers

const initialPostsState = {
  posts: {
    byId: null,
    allIds: []
  },
  comments: {
    byId: null,
    allIds: []
  },
  categories: [],
  sortBy: "date"
}

function postOffice (state = initialPostsState, action) {
  const { posts, comment, comments, newComment, categories, post, newPost, sortBy } = action
  // const { posts, comments, categories, post, sortBy } = action

  switch (action.type) {
    
    case RECEIVE_POSTS :
      let sortedArrayOfPosts = sortArrayOfPosts(state.sortBy, posts)
      return {
        ...state,
          posts: {
            ...posts,
              allIds: [...sortedArrayOfPosts]
          }
      }

    case RECEIVE_COMMENTS :
      return {
        ...state,
          comments: {
            ...comments
          }
      }

    case RECEIVE_CATEGORIES :
      return {
        ...state,
          categories: categories
      }

    case UPDATE_POST :
      let updatePostPostsObj = {
        ...state.posts,
        byId: {
          ...state.posts.byId,
          [post.id]: post
        }
      }
      let updatePostOrderedArrayOfPosts = sortArrayOfPosts(state.sortBy, updatePostPostsObj)
      return {
        ...state,
          posts: {
            ...updatePostPostsObj,
            allIds: [...updatePostOrderedArrayOfPosts]
          }
      }

    case DELETE_POST :
      return {
        ...state,
          posts: {
            ...state.posts,
            allIds: state.posts.allIds.filter(id => post.id !== id),
            byId: {
              ...state.posts.byId,
              [post.id]: post
            }
            
          }
      }

    case UPDATE_COMMENT :
      return {
        ...state,
          comments: {
            ...state.comments,
              byId: {
                ...state.comments.byId,
                [comment.id]: comment
              }
          }
      }

    case ADD_POST :
      let addPostPostsObj = {
        ...state.posts,
        byId: {
          ...state.posts.byId,
          [newPost.id]: newPost
        },
        allIds: [...state.posts.allIds, newPost.id]
      }
      let addPostOrderedArrayOfPosts = sortArrayOfPosts(state.sortBy, addPostPostsObj)
      return {
        ...state,
          posts: {
            ...addPostPostsObj,
            allIds: [...addPostOrderedArrayOfPosts]
          }
      }

    case ADD_COMMENT :
      return {
        ...state,
          comments: {
            ...state.comments,
            byId: {
              ...state.comments.byId,
              [newComment.id]: newComment
            },
            allIds: [...state.comments.allIds, newComment.id]
          },
          posts: {
            ...state.posts,
            byId: {
              ...state.posts.byId,
              [newComment.parentId]: {
                ...state.posts.byId[newComment.parentId],
                commentCount: state.posts.byId[newComment.parentId].commentCount + 1
              }
            }
          }
      }

    case DELETE_COMMENT :
      return {
        ...state,
          comments: {
            ...state.comments,
            allIds: state.comments.allIds.filter(id => id !== comment.id)
          },
          posts: {
            ...state.posts,
            byId: {
              ...state.posts.byId,
              [comment.parentId]: {
                ...state.posts.byId[comment.parentId],
                commentCount: state.posts.byId[comment.parentId].commentCount - 1
                }
              }
          }
      }
      
    case TOGGLE_SORT :
      let toggleSortedArrayOfPosts = sortArrayOfPosts(sortBy, state.posts)
      return {
        ...state,
          posts: {
            ...state.posts,
              allIds: [...toggleSortedArrayOfPosts]
          },
        sortBy: sortBy
      }

    default :
      return state
  }
}

export default combineReducers({
  postOffice
})
