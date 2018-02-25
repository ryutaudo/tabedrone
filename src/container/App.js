import { connect } from 'react-redux';
import { addEntryToFridge, removeEntryFromFridge } from '../action/index';
import App from '../components/App';

const mapStateToProps = state => ({
  fridgeContent: state.fridgeContent,
});

const mapDispatchToProps = dispatch => ({
  addEntryToFridge: (name, amount) =>
    dispatch(addEntryToFridge(name, amount)),
  removeEntryFromFridge: (name, amount) =>
    dispatch(removeEntryFromFridge(name, amount)),
});


const VisibleApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default VisibleApp;
