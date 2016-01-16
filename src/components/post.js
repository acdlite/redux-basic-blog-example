import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router';

import loadData from '../utils/load_data';
import * as actionCreators from '../actions/index';

class Post extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onDelete = () => {
    const { router } = this.context;
    const { deletePost, post } = this.props
    router.push('/');
    deletePost(post.id);
  };

  render() {
    const { post } = this.props;
    return (
      <div className="row">
        <div className="col-xs-12 m-y-1">
          <Link to="/">&lsaquo; Back to posts</Link>
        </div>
        <div className="col-md-8">
          <PostContent post={post} />
        </div>
        <div className="col-md-4 text-xs-right">
          <button onClick={this.onDelete} className="btn btn-danger">
            Delete Post
          </button>
        </div>
      </div>
    );
  }
};

const PostContent = ({ post }) => {
  if (!post) return <PostNotFound />;

  return (
    <div>
      <header className="m-b-2">
        <h1>{post.title}</h1>
        <h6>Categories: {post.categories}</h6>
      </header>
      <div>{post.content}</div>
    </div>
  );
}

const PostNotFound = () => (
  <p>The requested post does not exist.</p>
);

function mapStateToProps(state, ownProps) {
  return {
    post: state.posts[ownProps.params.postId]
  };
}

function load(props, cb) {
  props.getPost(props.params.postId).then(cb);
}

export default compose(
  connect(mapStateToProps, actionCreators),
  loadData(load)
)(Post);
