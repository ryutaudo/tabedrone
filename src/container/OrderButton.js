import { connect } from 'react-redux';
// import { toggleTodo } from '../actions';
import OrderButton from '../components/OrderButton';

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

const VisibleOrderButton = connect(
  null, // mapStateToProps,
  null, // mapDispatchToProps,
)(OrderButton);

export default VisibleOrderButton;
