import { getCurrentFridgeContents } from '../utils/index';

const getFridgeContentsSuccess = fridgeContents => ({
  type: 'GET_FRIDGE_CONTENTS',
  fridgeContents,
});

const getFridgeContents = () => async (dispatch) => {
  const fridgeContents = await getCurrentFridgeContents();
  dispatch(getFridgeContentsSuccess(fridgeContents));
};


export { getFridgeContents };
