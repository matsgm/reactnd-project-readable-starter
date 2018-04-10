import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Post from './post'

class Category extends Component {
  render() {
    return (
      <div>
        {this.props.filteredPostsId.map( id => {
          return <Post 
                  post={this.props.postOffice.posts.byId[id]}
                  key={id}
          />
        })}

      </div>
    )
  }
}

const mapStateToProps = (posts, props) => ({
  ...posts,
  filteredPostsId: posts.postOffice.posts.allIds.filter( item => posts.postOffice.posts.byId[item].category === props.categoryName && posts.postOffice.posts.byId[item].deleted === false )
})

export default withRouter(connect(
  mapStateToProps
)(Category))