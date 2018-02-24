import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
  display: 'inline',
};

class FridgeInventory extends Component {
  componentDidMount() {
    this.props.getFridgeContents();
  }

  get currentInventory() {
    if (this.props.fridgeContents.length === 0) {
      return <span> Loading... </span>;
    }
    return this.props.fridgeContents.map(content => (
      <div className="content" key={content.id} style={styles}>
        <img
          src={`/img/${content.name}.png`}
          alt={content.name}
          height="200"
          width="200"
        />
      </div>
    ));
  }

  render() {
    return (
      <div className="fridge-inventory">
        {this.currentInventory}
      </div>
    );
  }
}

FridgeInventory.propTypes = {
  getFridgeContents: PropTypes.func.isRequired,
  fridgeContents: PropTypes.array.isRequired,
};

export default FridgeInventory;
