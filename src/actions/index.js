import {
  DID_GET_POSTS,
  DID_GET_POST,
  DID_CREATE_POST,
  DID_DELETE_POST
} from '../action_types';

const mockPosts = {
  '1': {
    id: '1',
    title: 'Hello, world!',
    categories: 'misc, yay',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  '2': {
    id: '2',
    title: 'Another post',
    categories: 'stuff, woo',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }
};

export const getPosts = () => ({
  type: DID_GET_POSTS,
  payload: Promise.resolve(
    Object.keys(mockPosts).map(id => mockPosts[id])
  )
});

export const getPost = id => {
  return {
    type: DID_GET_POST,
    payload: Promise.resolve(mockPosts[id])
  };
};

export const createPost = fields => {
  const id = Math.random().toString(36).substr(2, 8);

  mockPosts[id] = {
    ...fields,
    id
  };

  return {
    type: DID_CREATE_POST,
    payload: Promise.resolve(mockPosts[id])
  };
}

export const deletePost = id => {
  delete mockPosts[id];

  return {
    type: DID_DELETE_POST,
    payload: id
  };
}
