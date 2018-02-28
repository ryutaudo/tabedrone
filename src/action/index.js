const addEntryToFridge = (contentName, amount) => ({
  type: 'ADD_FRIDGE_CONTENT',
  contentName,
  amount,
});

const initProductList = listOfProducts => ({
  type: 'INIT',
  listOfProducts,
});

const removeEntryFromFridge = (contentName, amount) => ({
  type: 'REMOVE_FRIDGE_CONTENT',
  contentName,
  amount,
});

const updateNewProduct = newProduct => ({
  type: 'UPDATE_NEW_PRODUCT',
  newProduct,
});

module.exports = {
  addEntryToFridge,
  removeEntryFromFridge,
  initProductList,
  updateNewProduct,
};
