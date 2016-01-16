import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Home from './components/home';
import Post from './components/post';
import NewPost from './components/new_post';

export const createRoutes = store => (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="posts/:postId">
      <IndexRoute component={Post} />
    </Route>
    <Route path="new-post" component={NewPost} />
  </Route>
);
