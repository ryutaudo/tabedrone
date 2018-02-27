import { connect } from 'react-redux';
import { addEntryToFridge, removeEntryFromFridge } from '../action/index';
import App from '../components/App';

const mapStateToProps = state => ({
  fridgeContent: state.fridgeContent,
  customerId: state.customerId,
});

const mapDispatchToProps = dispatch => ({
  addEntryToFridge: (name, amount) =>
    dispatch(addEntryToFridge(name, amount)),
  removeEntryFromFridge: (name, amount) =>
    dispatch(removeEntryFromFridge(name, amount)),
  initProductList: listOfProducts =>
    dispatch(listOfProducts(listOfProducts)),
});

console.log(App);
const VisibleApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default VisibleApp;
