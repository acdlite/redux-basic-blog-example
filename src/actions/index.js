import axios from 'axios';

import {
  DID_GET_POSTS,
  DID_GET_POST,
  DID_CREATE_POST,
  DID_DELETE_POST
} from '../action_types';

const API_URL = 'http://104.236.201.225';

export const getPosts = () => ({
  type: DID_GET_POSTS,
  payload: axios.get(`${API_URL}/posts.json`)
});

export const getPost = id => {
  return {
    type: DID_GET_POST,
    payload: axios.get(`${API_URL}/posts/${id}.json`)
  };
};

export const createPost = fields => {
  return {
    type: DID_CREATE_POST,
    payload: axios.post(`${API_URL}/posts.json`)
  };
}

export const deletePost = id => {
  return {
    type: DID_DELETE_POST,
    payload: axios.delete(`${API_URL}/posts/${id}.json`)
  };
}
