import { connect } from 'react-redux';
// import { toggleTodo } from '../actions';
import Headline from '../components/Headline';

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

const VisibleHeadline = connect(
  null, // mapStateToProps,
  null, // mapDispatchToProps,
)(Headline);

export default VisibleHeadline;
