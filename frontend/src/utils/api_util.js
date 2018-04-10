const axios = require('axios')
const url = 'http://localhost:3001'

//TODO: Voting could share same procedure with "posts" or "comments" as parameter.
//TODO: Error handling.

const axiosConfig = {
  headers: {
    'authorization': 'some'
  }
}

export const fetchPosts = () => axios.get(`${url}/posts`, axiosConfig)
  .then(res => {
      //console.log(res.data)
      return res.data
    })
  .catch( (err) => {
    console.log(err);
});

export const fetchComments = (id) => axios.get(`${url}/posts/${id}/comments`, axiosConfig)
  .then(res => {
    //console.log(`Fetched comments`, res)
    return res.data
  })
  .catch( err => {
    console.log(err)
})

export const fetchCategories = () => axios.get(`${url}/categories`, axiosConfig)
  .then(res => {
    //console.log(`Categories `, res.data)
    return res.data.categories
  })
  .catch( (err) => {
    console.log(err)
})

export const votePost = (id, vote) => axios.post(`${url}/posts/${id}`, {option: vote}, axiosConfig)
  .then(res => {
    //console.log(`Returned from voting`, res.data)
    return res.data
  })
  .catch( err => {
    console.log(`Error when voting`, err)
})


export const addPost = (postObj) => axios.post(`${url}/posts`, postObj, axiosConfig)
  .then(res => {
    //console.log(`Added post. This is result`, res)
    return res.data
  })
  .catch(err => {
    console.log(`Error when adding post`, err)
})

export const editPost = (postObj, id) => axios.put(`${url}/posts/${id}`, postObj, axiosConfig)
  .then(res => {
    //console.log(`Result when edit post`, res.data)
    return res.data
  })
  .catch(err => {
    console.log(`Error when editing post`, err)
  })

export const deletePost = (id) => axios.delete(`${url}/posts/${id}`, axiosConfig)
  .then(res => {
    //console.log(`Deleted post. This is result`, res)
    return res.data
  })
  .catch(err => {
    console.log(`Error when deleting post`, err)
})

export const voteComment = (id, vote) => axios.post(`${url}/comments/${id}`, {option: vote}, axiosConfig)
  .then(res => {
    //console.log(`Returned from voting`, res.data)
    return res.data
  })
  .catch( err => {
    console.log(`Error when voting`, err)
})

export const addComment = (commentObj) => axios.post(`${url}/comments`, commentObj, axiosConfig)
  .then(res => {
    //console.log(`Added comment. This is result`, res)
    return res.data
  })
  .catch(err => {
    console.log(`Error when adding comment`, err)
})

export const deleteComment = id => axios.delete(`${url}/comments/${id}`, axiosConfig)
  .then(res => {
    //console.log(`Deleted comment result : `, res.data)
    return res.data
  })
  .catch(err => {
    console.log(`Error when deleting comment`, err)
})

export const editComment = (commentObj, id) => axios.put(`${url}/comments/${id}`, commentObj, axiosConfig)
  .then(res => {
    return res.data
  })
  .catch(err => {
    console.log(`Error when editing post`, err)
  })