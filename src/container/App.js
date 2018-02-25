import { connect } from 'react-redux';
// import { toggleTodo } from '../actions';
import App from '../components/App';

const mapStateToProps = state => {
  return {
    fridgeContent: state.fridgeContent,
  }
}

/* const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
} */

const VisibleApp = connect(
  mapStateToProps,
  null, // mapDispatchToProps,
)(App);

export default VisibleApp;
