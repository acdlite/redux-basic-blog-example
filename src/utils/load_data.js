import React, { Component } from 'react';

// AFAICT there's no clear consensus on the best way to fetch data before
// rendering. Each approach has its trade-offs. To keep things simple,
// I've gone with the most straightforward approach, which is just to load data
// when the component mounts, but I'd be happy to revisit this if you like.

// Higher-order component that waits until some data has loaded
// before rendering
const loadData = load => BaseComponent =>
  class LoadData extends Component {
    state = { hasLoaded: false };

    componentDidMount() {
      load(this.props, data =>
        this.setState({
          hasLoaded: true,
          data
        })
      )
    }

    render() {
      if (!this.state.hasLoaded) return null;
      return <BaseComponent {...this.props} {...this.data} />
    }
  }

export default loadData;
