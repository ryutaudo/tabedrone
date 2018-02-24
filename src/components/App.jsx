import React, { Component } from 'react';
import FridgeInventory from '../containers/FridgeInventory';
import '../styles/styles.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        Hello World!!!!!
        < FridgeInventory />
      </div>
    );
  }
}

export default App;
