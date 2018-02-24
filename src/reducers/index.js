const defaultState = {
  fridgeContents: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_FRIDGE_CONTENTS': {
      return Object.assign({}, state, action.fridgeContents);
    }
    default: {
      return state;
    }
  }
};

export default reducer;
