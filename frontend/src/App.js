import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, withRouter, Switch, Link } from 'react-router-dom'
import {
  fetchPosts,
  fetchCategories,
  toggleSort
  } from './actions'
import './App.css';
import Post from './components/post'
import Category from './components/category'
import DetailedPost from './components/detailedPost'
import AddPost from './components/addPost'

//TODO: Deleted posts, deleted=true, could be filtered out during mapStateToProps.
// Only posts in array is mapped.

//TODO: Initial loading when fetching posts and comments

//TODO: Make container of "sorting and add post"

class App extends Component {
  constructor(props) {
    super(props)
    this.toggleAddPost = this.toggleAddPost.bind(this)
    this.handleToggleSort = this.handleToggleSort.bind(this)
    this.state = {
      showAddPost : false,
      sortBy : "date"
    }
  }

  toggleAddPost() {
    this.state.showAddPost === true ? this.setState({showAddPost : false}) : this.setState({showAddPost : true})
  }

  componentDidMount() {
    this.props.getPosts()
    this.props.getCategories()
  }

  handleToggleSort() {
    let sortBy
    this.props.postOffice.sortBy === "date" ? sortBy = "vote" : sortBy = "date"
    this.props.toggleSort(sortBy) 
  }
 
  render() {
    return (
      
      <div className="App">
        <div className="category-container">
          <div><Link to="/">Home</Link>&nbsp;&nbsp;
            {this.props.postOffice.categories.map( category => (
              <span key={category.path}>-&nbsp;&nbsp;<Link to={`/${category.path}`}>{category.name}</Link>&nbsp;&nbsp;</span>
            ))}
          </div>
        </div>

        <Switch>
          {this.props.postOffice.categories.map( category => {
            return <Route exact path={`/${category.path}`} key={category} render={ () => (
              <div>
                  <div className="container">
                    Sort by: {this.props.postOffice.sortBy === "date" ? <span><strong>Date</strong> | <a onClick={this.handleToggleSort} className="hover-pointer">Votes</a></span> : <span><a  onClick={this.handleToggleSort} className="hover-pointer">Date</a> | <strong>Votes</strong></span>}
                    {this.state.showAddPost === false && <button onClick={this.toggleAddPost} className="show-hide-button">Add post</button>}
                </div>
                {this.state.showAddPost === true && <AddPost toggleAddPost={this.toggleAddPost} />}
                <Category categoryName={category.name} key={category.path} />
              </div>
              

            )}/>
          })}

          {this.props.postOffice.categories.map( category => {
            return <Route exact path={`/${category.path}/:id`} key={category} render={ () => (
              <DetailedPost />
            )}/>
          })}

          <Route path="/:path" render={ ({match}) => (
            <div className="container">
              {match.params.path} is not a valid category.
            </div>
          )}/>
        </Switch>

        <Route exact path="/" render={ () => (
          <div>
            <div className="container">
                    Sort by: {this.props.postOffice.sortBy === "date" ? <span><strong>Date</strong> | <a onClick={this.handleToggleSort} className="hover-pointer">Votes</a></span> : <span><a  onClick={this.handleToggleSort} className="hover-pointer">Date</a> | <strong>Votes</strong></span>}
                    {this.state.showAddPost === false && <button onClick={this.toggleAddPost} className="show-hide-button">Add post</button>}
            </div>
        
            {this.state.showAddPost === true && <AddPost toggleAddPost={this.toggleAddPost} />}
            
            <div>            
              {this.props.postOffice.posts.allIds.map( (id) => (
                
                <Post post={this.props.postOffice.posts.byId[id]} key={id} /> 

              ))}
            </div>
          </div>
        )}/>

      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  ...state
})

function mapDispatchToProps (dispatch) {
  return {
    getPosts: () => dispatch(fetchPosts()),
    getCategories: () => dispatch(fetchCategories()),
    toggleSort: (sortBy) => dispatch(toggleSort(sortBy))
  }
}

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps
)(App))