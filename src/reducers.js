const DefaultState = {
  customerId: 1,
  fridgeContent: {
    milch: 3,
    hamburger: 1,
  },
  cart: {},
};

const reducers = (state = DefaultState, action) => {
  console.log(state.cart);
  const getCopyFromState = () => JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'ADD_FRIDGE_CONTENT': {
      const newState = getCopyFromState();
      if (newState.fridgeContent[action.contentName] === undefined) {
        newState.fridgeContent[action.contentName] = 0;
      }
      if (newState.cart[action.contentName] === undefined) {
        newState.cart[action.contentName] = 0;
      }
      newState.fridgeContent[action.contentName] += action.amount;
      newState.cart[action.contentName] += 1;
      return newState;
    }

    case 'REMOVE_FRIDGE_CONTENT': {
      const newState = getCopyFromState();
      newState.fridgeContent[action.contentName] -= action.amount;
      newState.cart[action.contentName] -= 1;
      if (newState.fridgeContent[action.contentName] <= 0) {
        delete newState.fridgeContent[action.contentName];
      }
      if (newState.cart[action.contentName] <= 0) {
        delete newState.cart[action.contentName];
      }
      return newState;
    }

    default:
      return state;
  }
};

module.exports = reducers;
