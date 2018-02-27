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

module.exports = {
  addEntryToFridge,
  removeEntryFromFridge,
  initProductList,
};
