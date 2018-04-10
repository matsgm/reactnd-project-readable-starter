export const sortArrayOfPosts = (sortBy, posts) => {
  let orderedPosts = [...posts.allIds]

  sortBy === "date" ? orderedPosts.sort((a,b) => {
      return posts.byId[b].timestamp - posts.byId[a].timestamp 
    }) : orderedPosts.sort((a,b) => {
      return posts.byId[b].voteScore - posts.byId[a].voteScore
  })

  return orderedPosts
}