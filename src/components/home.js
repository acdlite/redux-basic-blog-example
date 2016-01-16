import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router';

import loadData from '../utils/load_data';
import * as actionCreators from '../actions/index';

const HomePostItem = ({ title, id, categories }) => (
  <div className="m-y-1">
    <Link to={`/posts/${id}`}>
      <div className="row">
        <h2 className="col-md-8">
          {title}
        </h2>
        <div className="col-md-4 text-md-right">
          {categories}
        </div>
      </div>
    </Link>
  </div>
);

const Home = ({ posts }) => (
  <div>
    <div className="text-xs-right">
      <Link to="/new-post" className="btn btn-primary">
        Add a Blog Post
      </Link>
    </div>
    <div className="m-y-1">
      {posts.map(post => <HomePostItem key={post.id} {...post} />)}
    </div>
  </div>
);

function load(props, cb) {
  props.getPosts().then(cb);
}

function mapStateToProps(state) {
  return {
    posts: Object.keys(state.posts).map(id => state.posts[id])
  };
}

export default compose(
  connect(mapStateToProps, actionCreators),
  loadData(load)
)(Home);
