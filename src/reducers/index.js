const defaultState = {
  fridgeContents: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_FRIDGE_CONTENTS': {
      return Object.assign({}, state, {
        fridgeContents: action.fridgeContents,
      });
    }
    default: {
      return state;
    }
  }
};

export default reducer;
