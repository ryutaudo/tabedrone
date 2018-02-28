import { connect } from 'react-redux';
import { addEntryToFridge, removeEntryFromFridge, initProductList, updateNewProduct } from '../action/index';
import App from '../components/App.jsx';

const mapStateToProps = state => ({
  fridgeContent: state.fridgeContent,
  customerId: state.customerId,
  cart: state.cart,
  newProduct: state.newProduct,
});

const mapDispatchToProps = dispatch => ({
  addEntryToFridge: (name, amount) =>
    dispatch(addEntryToFridge(name, amount)),
  removeEntryFromFridge: (name, amount) =>
    dispatch(removeEntryFromFridge(name, amount)),
  initProductList: listOfProducts =>
    dispatch(initProductList(listOfProducts)),
  updateNewProduct: newProduct =>
    dispatch(updateNewProduct(newProduct)),
});

const VisibleApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default VisibleApp;
