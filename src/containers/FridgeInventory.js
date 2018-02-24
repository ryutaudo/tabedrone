import { connect } from 'react-redux';
import FridgeInventory from '../components/FridgeInventory';

import { getFridgeContents } from '../actions/index';

const mapStateToProps = state => ({
  fridgeContents: state.fridgeContents,
});

const mapDispatchToProps = dispatch => ({
  getFridgeContents: () => dispatch(getFridgeContents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FridgeInventory);
