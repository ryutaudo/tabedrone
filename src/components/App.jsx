import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Headline from '../container/Headline';

/**
 * @todo load init inventore from the database and remove dummy data from the reducer
 */
export default class App extends Component {
  constructor(props) {
    super(props);
    this.addFridgeEntry = this.addFridgeEntry.bind(this);
    this.removeFridgeEntry = this.removeFridgeEntry.bind(this);

    this.products = [
      'にく',
      'とりにく',
      'なす',
      'あじ',
      'すし',
      'みそらーめん',
      'しおらーめん',
      'しお',
    ];
  }

  async componentDidMount() {
    const products = await fetch(
      `/api/fridge-contents/${this.props.customerId}`,
      {
        method: 'POST',
        headers: new Headers({
          'content-type': 'application/json',
        }),
      },
    );
    const productList = products.map(product => ({ name: product.name, amount: product.amount }));

    this.props.initProductList(productList);
  }

  async addFridgeEntry(event, name = '', amount = 1) {
    event.preventDefault();

    if (name === '') {
      name = document.getElementById('new-product').value;
    }

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
            <div className="inventoryEntry" key={idx}>
              <h2 className="productName">{name}</h2>
              <strong>ammount:</strong> {this.props.fridgeContent[name]}<br />
              <div className="iconList">
                <div id="add-fridge-single-entry" onClick={event => this.addFridgeEntry(event, name)}>
                  +
                </div>
                <div id="remove-fridge-single-entry" onClick={event => this.removeFridgeEntry(event, name)}>
                  -
                </div>
              </div>
            </div>
          ))
        }
        <div className="inventoryEntry" id="add-fridge-entry">
            add new product:<br />
            <select id="new-product">
              {
                this.products.filter(product => !Object.keys(this.props.fridgeContent).includes(product))
                .map((product, idx) => (
                    <option key={idx} value={product}>{product}</option>
                ))
              }
            </select>
          <div className="iconList" onClick={event => this.addFridgeEntry(event)}>
            <div>+</div>
          </div>
        </div>
      </div>
    </div>);
  }
}
