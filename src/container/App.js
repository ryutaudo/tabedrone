import { connect } from 'react-redux';
// import { toggleTodo } from '../actions';
import App from '../components/App';

/* const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
} */

const VisibleApp = connect(
  null, // mapStateToProps,
  null, // mapDispatchToProps,
)(App);

export default VisibleApp;
