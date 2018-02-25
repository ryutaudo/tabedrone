import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Headline from '../container/Headline';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.addFridgeEntry = this.addFridgeEntry.bind(this);
    this.removeFridgeEntry = this.removeFridgeEntry.bind(this);
  }

  async addFridgeEntry(event, name = '', amount = 1) {
    event.preventDefault();
    if (name !== '') {
      this.props.addEntryToFridge(name, amount);

      await fetch(
        '/api/order',
        {
          method: 'POST',
          headers: new Headers({
            'content-type': 'application/json',
          }),
          body: JSON.stringify({ customerId: this.props.customerId, cart: [{ name, amount }] }),
        },
      );
    } else {
      confirmAlert({
        title: 'Buy new product',
        message: `did you want to delete ${fileName}`,
        confirmLabel: 'Buy',
        cancelLabel: 'Cancel',
        onConfirm: async function () {
          // send to server
          await fetch(
            '/api/',
            {
              headers: new Headers({
                'content-type': 'application/json',
              }),
              method: 'DELETE',
              body: JSON.stringify({ fileName })
            },
          ).then(response => response.json());

          this.props.deleteFile(fileName);
        }.bind(this),
      });
    }
  }

  async removeFridgeEntry(event, name = '', amount = 1) {
    event.preventDefault();

    this.props.removeEntryFromFridge(name, amount);

    await fetch(
      '/api/use-product',
      {
        method: 'DELETE',
        headers: new Headers({
          'content-type': 'application/json',
        }),
        body: JSON.stringify({ customerId: this.props.customerId, cart: [{ name, amount }] }),
      },
    );
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
    </div>);
  }
}
