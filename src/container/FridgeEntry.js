import { connect } from 'react-redux';
// import { toggleTodo } from '../actions';
import FridgeEntry from '../components/FridgeEntry';

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

const VisibleFridgeEntry = connect(
  null, // mapStateToProps,
  null, // mapDispatchToProps,
)(FridgeEntry);

export default VisibleFridgeEntry;
