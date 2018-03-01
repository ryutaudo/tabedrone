import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Headline from '../container/Headline';

/**
 * @todo load init inventory from the database and remove dummy data from the reducer
 */
export default class App extends Component {
  constructor(props) {
    super(props);
    this.addFridgeEntry = this.addFridgeEntry.bind(this);
    this.removeFridgeEntry = this.removeFridgeEntry.bind(this);
    this.convertCartToString = this.convertCartToString.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const productsResponse = await fetch(
      `/api/fridge-contents/${this.props.customerId}`,
      {
        method: 'GET',
        headers: new Headers({
          'content-type': 'application/json',
        }),
      },
    );
    const products = await productsResponse.json();
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

  convertCartToString() {
    console.log('cart contents ', JSON.stringify(this.props.cart));
    const cartObject = this.props.cart;

    // return Object.entries(cartObject).map(([key, value]) => <li>{key} : {value} </li>);
    return Object.entries(cartObject).map(([key, value]) => <span>{key} : {value} <br /> </span>);
  }

  handleSubmit() {
    confirmAlert({
      title: 'Confirm your order', // Title dialog
      message: 'Your order list', // Message dialog
      childrenElement: () => <div><br />{this.convertCartToString()}</div>, // Custom UI or Component
      confirmLabel: 'Confirm Order', // Text button confirm
      cancelLabel: 'Cancel Order', // Text button cancel
      onConfirm: () => {
        confirmAlert({
          title: 'Order Sent', // Title dialog
          message: 'We will send a drone soon.', // Message dialog
          childrenElement: () => <div><br />Flight Plan status and coordinates in progress... </div>,
          confirmLabel: 'OK', // Text button confirm
        });
        setTimeout(() => {
          confirmAlert({
            title: 'Food arrived to customer!', // Title dialog
            message: 'status: success', // Message dialog
            confirmLabel: 'OK', // Text button confirm
          });
        }, 8000);
      },
    });
  }

  handleChange(event) {
    event.preventDefault();
    const newProduct = event.target.value;
    this.props.updateNewProduct(newProduct);
  }

  render() {
    return (<div>
      <Headline />
      <div className="fridge">
        {
          Object.keys(this.props.fridgeContent).map((name, idx) => (
            <div className="inventoryEntry" key={idx}>
              <div className="img-wrap">
                <img
                  className="productIcon"
                  src={`${name}.png`}
                  alt={name}
                />
              </div>
              <div className="amount" title="amount">
                {this.props.fridgeContent[name]}
              </div>
              <div className="productInfo">
                <div className="iconList">
                  <div
                    id="add-fridge-single-entry"
                    onClick={event => this.addFridgeEntry(event, name)}
                  >
                    +
                  </div>
                  <div
                    id="remove-fridge-single-entry"
                    onClick={event => this.removeFridgeEntry(event, name)}
                  >
                    -
                  </div>
                </div>
              </div>
            </div>
          ))
        }
        <div className="inventoryEntry" id="add-fridge-entry">
          <div className="content">
            <div className="add-description">New product</div>
            <div>
            <input
            type="text"
            id="new-product"
            value={this.props.newProduct}
            onChange={this.handleChange}
          />
          </div>
          </div>
          <div className="productInfo">
            <div
            className="iconList"
            onClick={event => this.addFridgeEntry(event)}
          >
            <div>+</div>
          </div>
          </div>
        </div>
      </div>
      <button className="submitButton" onClick={this.handleSubmit}>Submit order</button>
            </div>);
  }
}
