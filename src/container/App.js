import { connect } from 'react-redux';
import { addEntryToFridge, removeEntryFromFridge, initProductList } from '../action/index';
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
    dispatch(initProductList(listOfProducts)),
});

const VisibleApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default VisibleApp;
