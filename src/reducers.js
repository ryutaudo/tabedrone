const DefaultState = {
  customerId: 1,
  fridgeContent: {
    Milk: 3,
    Potato: 1,
    Apple: 1,
  },
  cart: {},
  newProduct: undefined,
};

const reducers = (state = DefaultState, action) => {
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

    case 'UPDATE_NEW_PRODUCT': {
      const newState = getCopyFromState();
      newState.newProduct = action.newProduct;
      return newState;
    }

    default:
      return state;
  }
};

module.exports = reducers;
