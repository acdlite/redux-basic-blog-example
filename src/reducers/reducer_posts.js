import {
  DID_GET_POSTS,
  DID_GET_POST,
  DID_CREATE_POST,
  DID_DELETE_POST
} from '../action_types';

const addPostsToState = (posts, state) => {
  return posts.reduce((result, post) => {
    if (!post) return result;
    return {
      ...result,
      [post.id]: {
        ...result[post.id],
        ...post
      }
    };
  }, state);
}

export default function(state = {}, action) {
  // TODO: error handling? If so, I would suggest using redux-actions, since
  // redux-promise was designed with that in mind.
  if (action.error) {
    return state;
  }

  switch(action.type) {
  case DID_GET_POST:
  case DID_CREATE_POST:
    return addPostsToState([action.payload], state);
  case DID_GET_POSTS:
    return addPostsToState(action.payload, state);
  case DID_DELETE_POST:
    const id = action.payload;
    const newState = { ...state };
    delete newState[id];
    return newState;
  }

  return state;
}
