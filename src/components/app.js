import React from 'react';
import { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div className="container p-y-1">
        {this.props.children}
      </div>
    );
  }
}
