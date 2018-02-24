import React, { Component } from 'react';
import { getCurrentFridgeContents } from '../utils/index';

class App extends Component {
  async componentDidMount() {
    const result = await getCurrentFridgeContents();
  }

  render() {
    return (
      <div className="app">
        Hello World!!!!!
      </div>
    );
  }
}

export default App;
