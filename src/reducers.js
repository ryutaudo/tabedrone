const DefaultState = {
  fridgeContent: {
    milch: 3,
    hamburger: 1,
  },
};

const reducers = (state = DefaultState, action) => {
  const getCopyFromState = () => JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'ADD_FRIDGE_CONTENT': {
      const newState = getCopyFromState();
      if (newState.fridgeContent[action.contentName] === undefined) {
        newState.fridgeContent[action.contentName] = 0;
      }
      newState.fridgeContent[action.contentName] += action.amount;
      return newState;
    }

    case 'REMOVE_FRIDGE_CONTENT': {
      const newState = getCopyFromState();
      newState.fridgeContent[action.contentName] -= action.amount;
      if (newState.fridgeContent[action.contentName] < 0) {
        newState.fridgeContent[action.contentName] = 0;
      }
      return newState;
    }

    default:
      return state;
  }
};

module.exports = reducers;
