import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Post from './post'
import AddComment from './addComment'
import Comment from './comment'
import { fetchComments } from '../actions'
import PropTypes from 'prop-types';

//TODO: Only show comments from store/state if comments belongs to current post.
//  Build filter into mapStateToProps?

class DetailedPost extends Component {
  componentDidMount() {
    if (this.props.post !== null) this.props.getComments(this.props.match.params.id)
  }

  render() {
    return (
      <div>
        <div>
          {this.props.post ? (
            <div>
              <Post post={this.props.post} showBody={true} />
              
              {this.props.comments.allIds.length > 0 ?
              (
                this.props.comments.allIds.map(comment=>{
                  return <Comment comment={this.props.comments.byId[comment]} key={comment} />
                })
              ):(
                <div />
              )}

              <AddComment parentId={this.props.post.id} />
            </div>


            ) : <div className="container"> Post with id: {this.props.match.params.id} is not found.</div>
          }
        </div>
      </div>

    )
  }
}

DetailedPost.propTypes = {
  post: PropTypes.object
}

const mapStateToProps = (posts, props) => ({
  post: posts.postOffice.posts.byId[props.match.params.id],
  comments: posts.postOffice.comments
})

const mapDispatchToProps = (dispatch) => ({
  getComments: (id) => dispatch(fetchComments(id))
})
  
export default withRouter(connect(
  mapStateToProps, mapDispatchToProps
)(DetailedPost))