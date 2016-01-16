import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as actionCreators from '../actions/index';

const REQUIRED_FIELDS = ['title', 'categories', 'content'];

function validate(post) {
  return REQUIRED_FIELDS.every(name => Boolean(post[name]))
}

class NewPost extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  state = { post: {} };

  onSubmit = event => {
    event.preventDefault();

    const { createPost } = this.props;
    const { post } = this.state;
    const { router } = this.context;

    this.setState({ isCreating: true, didAttemptSubmit: true });

    if (!validate(post)) {
      return this.setState({ isCreating: false });
    }

    createPost(post).then(() => {
      this.setState({ isCreating: false });
      router.push('/');
    });
  };

  // This maybe too "clever"?
  onFieldChange = name => event =>
    this.setState(({ post }) => ({
      post: {
        ...post,
        [name]: event.target.value
      }
    }));

  render() {
    const fieldProps = {
      onFieldChange: this.onFieldChange,
      post: this.state.post,
      showValidationError: this.state.didAttemptSubmit
    };

    return (
      <div className="row">
        <div className="col-md-8">
          <form onSubmit={this.onSubmit}>
            <Field
              {...fieldProps}
              name="title"
              type="text"
              label="Title of post"
            />

            <Field
              {...fieldProps}
              name="categories"
              type="text"
              label="Categories"
            />

            <Field
              {...fieldProps}
              name="content"
              component="textarea"
              label="Content"
            />

            <div className="form-group">
              <button disabled={this.state.isCreating} className="btn btn-primary">
                Save Post
              </button>{' '}
              <Link to="/" className="btn btn-secondary">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

const Field = ({
  name,
  post,
  label,
  component = 'input',
  showValidationError,
  onFieldChange,
  ...props
}) => {
  const Input = component;

  // Should probably use classnames module here, but I'll let you decide
  const className = [
    'form-group',
    showValidationError && !Boolean(post[name]) && 'has-danger'
  ].filter(Boolean).join(' ');

  return (
    <fieldset className={className}>
      <label className="form-control-label">{label}</label>
      <Input
        value={post[name]}
        className="form-control"
        onChange={onFieldChange(name)} {...props} />
    </fieldset>
  )
};

export default connect(null, actionCreators)(NewPost);
