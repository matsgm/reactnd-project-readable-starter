import React, { Component } from 'react'
import { connect } from 'react-redux'
import { voteComment, deleteComment } from '../actions'
import { timeSince } from '../utils/time_util'
import AddComment from './addComment'

//TODO: Update votescore in store before sending to API, and then update store. Revert if fail.
//TODO: Proptypes

class Comment extends Component {
  constructor(props) {
    super(props)
    this.toggleEditComment = this.toggleEditComment.bind(this)
    this.state = {
      editComment : false    
    }
  }

  upVote = () => {
    this.props.voteComment(this.props.comment.id, "upVote")
  }

  downVote = () => {
    this.props.voteComment(this.props.comment.id, "downVote")
  }

  deleteComment = id => {
    this.props.deleteComment(this.props.comment.id)
  }

  toggleEditComment() {
    this.state.editComment === true ? this.setState({editComment : false}) : this.setState({editComment : true})
  }

  render () {
    let vartime = timeSince(this.props.comment.timestamp)

    return (
      <div>
        {this.state.editComment === false ? (
        <div className="container comment-container">
          <div className="comment-author">{this.props.comment.author} - {vartime}</div>
          <div className="comment-content">{this.props.comment.body}</div>
          <div className="post-vote"><span onClick={this.upVote}><i className="far fa-thumbs-up icon-hover"/></span>&nbsp;&nbsp;{this.props.comment.voteScore}&nbsp;&nbsp;<span onClick={this.downVote}><i className="fal fa-thumbs-down icon-hover" /></span></div>
          <div className="post-edit"><span onClick={this.toggleEditComment}><i className="far fa-edit icon-hover"></i></span></div>
          <div className="post-delete"><span onClick={this.deleteComment}><i className="far fa-trash-alt icon-hover"></i></span></div>
        </div>
        ):(
          <div>
            <AddComment comment={this.props.comment} toggleEditComment={this.toggleEditComment} parentId={this.props.comment.parentId} />
          </div>
        )}


      </div>



    )
  }
}

const mapStateToProps = () => ({})

const mapDispathToProps = (dispatch) => ({
  voteComment: (id, vote) => dispatch(voteComment(id, vote)),
  deleteComment: (id) => dispatch(deleteComment(id))
})

export default connect(
  mapStateToProps, mapDispathToProps
)(Comment)