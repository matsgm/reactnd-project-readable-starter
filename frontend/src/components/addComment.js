import { addComment, editComment } from '../actions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const uuidv1 = require('uuid/v1');

// TODO: State is set to base AFTER successfull post to API.

class AddComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      author: 'authorname',
      body: 'Add a comment'
    }
    this.baseState = this.state;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

  }

  componentDidMount() {
    this.props.comment && this.setState({author: this.props.comment.author, body: this.props.comment.body})
  }

  handleChange(event) {
    const target = event.target;
    //Use target.type checkbox if checkbox is used.
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    let commentObj = {
      ...this.state,
      id: uuidv1(),
      timestamp: Date.now(),
      parentId: this.props.parentId
    }

    //if this.props.comment we are editing an existing comment
    if (this.props.comment) {
      this.props.editComment({
        timestamp: Date.now(),
        body: this.state.body
      }, this.props.comment.id)
      this.props.toggleEditComment();
    } else {
      this.props.addComment(commentObj)
      this.setState(this.baseState)
    }

    event.preventDefault();

  }

  handleCancel(event) {
    this.props.toggleEditComment();
    event.preventDefault();
  }


  render() {
    let disabledInput;
    this.props.comment ? disabledInput = true : disabledInput = false

    return (
      <div className="container addcomment-container">
        <form onSubmit={this.handleSubmit}>
          <div>
            <textarea className="input-comment" name="body" value={this.state.body} onChange={this.handleChange} />
            <input name="author" type="text" value={this.state.author} onChange={this.handleChange} disabled={disabledInput} />
            <input type="submit" value="Add" />
            {this.props.comment && <button onClick={this.handleCancel} className="button button-right">Cancel</button>}
          </div>
        </form>
      </div>
    )
  }
}

AddComment.propTypes = {
  parentId: PropTypes.string.isRequired,
  comment: PropTypes.object,
  toggleEditComment: PropTypes.func
}

const mapStateToProps = () => ({})

const mapDispathToProps = (dispatch) => ({
  addComment: (commentObj) => dispatch(addComment(commentObj)),
  editComment: (commentObj, id) => dispatch(editComment(commentObj, id))
})

export default connect(
  mapStateToProps, mapDispathToProps
)(AddComment)