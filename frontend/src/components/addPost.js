import { addPost, editPost } from '../actions'
import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

const uuidv1 = require('uuid/v1');

class AddPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      author: 'author',
      category: 'react',
      title: 'default title',
      body: 'something in here'
    }
    this.baseState = this.state

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    if (this.props.post) {
      this.setState({
        ...this.props.post
      })
    }

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
    let postObj = {
      ...this.state,
      id: uuidv1(),
      timestamp: Date.now()
    }

    //if this.props.post exists we are editing an existing post.
    if (this.props.post) {
      this.props.editPost({
        title: this.state.title,
        body: this.state.body
      }, this.props.post.id)
    } else {
      this.props.addPost(postObj)
    }

    


    // TODO: State is cleared AFTER successfull post to API.
    this.setState(this.baseState)

    this.props.toggleAddPost()

    event.preventDefault();
  }

  handleCancel(event) {
    this.props.toggleAddPost();
    event.preventDefault();
  }

  render() {
    let disabledInput;
    this.props.post ? disabledInput = true : disabledInput = false

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div>
            Author:
          </div>
          <div>
            <input name="author" type="text" value={this.state.author} onChange={this.handleChange} disabled={disabledInput} />
          </div>
          <div>
            Category:
          </div>
          {disabledInput === true ? (
          <div>
            <select name="category" disabled={disabledInput}>
              <option value={this.state.category} selected>{this.state.category}</option>
            </select>
          </div>
          ) : (
          <div>
            <select name="category" onChange={this.handleChange} disabled={disabledInput}>
              {this.props.categories.map(category=>{
                return <option value={category.path}>{category.name}</option>
              })}
            </select>
          </div>
          )}
          <div>
            Title:
          </div>
          <div>
            <input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
          </div>
          <div>
            Post:
          </div>
          <div>
            <textarea name="body" value={this.state.body} onChange={this.handleChange} />
            <button className="button button-right" onClick={this.handleCancel}>Cancel</button>
            <input type="submit" value="submit" />
          </div>
          <div>
          </div>
          
        </form>
      </div>
    )
  }
}

AddPost.propTypes = {
  post: PropTypes.object,
  toggleAddPost: PropTypes.func.isRequired
}

const mapStateToProps = (posts, props) => ({
  categories: posts.postOffice.categories
})

const mapDispathToProps = (dispatch) => ({
  addPost: (postObj) => dispatch(addPost(postObj)),
  editPost: (postObj, id) => dispatch(editPost(postObj, id))
})

export default connect(
  mapStateToProps, mapDispathToProps
)(AddPost)