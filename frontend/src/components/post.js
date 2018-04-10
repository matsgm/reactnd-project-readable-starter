import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { votePost, deletePost } from '../actions'
import { timeSince } from '../utils/time_util'
import AddPost from './addPost'
import PropTypes from 'prop-types';


class Post extends Component {
  //TODO : Update redux state before sending vote to server.
  //TODO : Voting error when server is not responding

  constructor(props) {
    super(props)
    this.toggleEditPost = this.toggleEditPost.bind(this)
    this.state = {
      editPost : false
    }
  }

  upVote = () => {
    this.props.votePost(this.props.post.id, "upVote")
  }
  downVote = () => {
    this.props.votePost(this.props.post.id, "downVote")
  }
  deletePost = () => {
    this.props.deletePost(this.props.post.id)
  }
  toggleEditPost() {
    this.state.editPost === true ? this.setState({editPost: false}) : this.setState({editPost: true})
  }

  render() {
    let vartime = timeSince(this.props.post.timestamp)

    return (

      <div>
        {this.state.editPost === false ? (

          <div key={this.props.post.id} className="post-container">
            <div>{this.props.post.deleted === true && <Redirect to="/" />}</div>
            <div className="post-author">{this.props.post.author} - {vartime} - in /{this.props.post.category}</div>
            <div className="post-content">
              {this.props.showBody ? (
                <div>
                  <div>{this.props.post.title}</div>
                  <div className="post-body">{this.props.post.body}</div>
                </div>
                ) : (
                  <Link to={`/${this.props.post.category}/${this.props.post.id}`}>{this.props.post.title}</Link>
                )}
            </div>
            <div className="post-vote"><span onClick={this.upVote}><i className="far fa-thumbs-up icon-hover" /></span>&nbsp;&nbsp;{this.props.post.voteScore}&nbsp;&nbsp;<span onClick={this.downVote}><i className="far fa-thumbs-down icon-hover" /></span></div>
            <div className="post-comment-count">{this.props.post.commentCount}&nbsp;&nbsp;<i className="far fa-comments" /></div>
            <div className="post-edit"><span onClick={this.toggleEditPost}><i className="far fa-edit icon-hover"></i></span></div>
            <div className="post-delete"><span onClick={this.deletePost}><i className="far fa-trash-alt icon-hover"></i></span></div>
          </div>

        ):(
          <AddPost post={this.props.post} toggleAddPost={this.toggleEditPost} />
        )}

      </div>

    )
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired
}

const mapStateToProps = () => ({})

const mapDispathToProps = (dispatch) => ({
  votePost: (id, vote) => dispatch(votePost(id, vote)),
  deletePost: (id) => dispatch(deletePost(id))
})

export default connect(
  mapStateToProps, mapDispathToProps
)(Post)

 
/*id(pin): "8xf0y6ziyjabvozdd253nd"
timestamp(pin): 1467166872634
title(pin): "Udacity is the best place to learn React"
body(pin): "Everyone says so after all."
author(pin): "thingtwo"
category(pin): "react"
voteScore(pin): 6
deleted(pin): false
commentCount(pin): 2
*/