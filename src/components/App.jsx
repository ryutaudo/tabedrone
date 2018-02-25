import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Headline from '../container/Headline';
import OrderButton from '../container/OrderButton';
import FridgeEntry from '../container/FridgeEntry';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.addFridgeEntry = this.addFridgeEntry.bind(this);
    this.removeFridgeEntry = this.removeFridgeEntry.bind(this);
  }

  addFridgeEntry(event, name = '') {
    event.preventDefault();
  }

  removeFridgeEntry(event, name = '') {
    event.preventDefault();
  }

  render() {
    return (<div>
      <Headline />

      <div className="fridge">
        {
          Object.keys(this.props.fridgeContent).map((name, idx) => (
            <div key={idx}>
              name: {name}<br />
              ammount: {this.props.fridgeContent[name]}<br />
              <div id="add-fridge-single-entry" onClick={event => this.addFridgeEntry(event, name)}>
                 +
              </div>
              <div id="remove-fridge-single-entry" onClick={event => this.removeFridgeEntry(event, name)}>
                 -
              </div>
            </div>
          ))
        }
        <div id="add-fridge-entry" onClick={event => this.addFridgeEntry(event)}>
          +
        </div>
      </div>
      hello world
      <OrderButton />
    </div>);
  }
}
