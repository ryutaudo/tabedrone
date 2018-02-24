const getCurrentFridgeContents = async () => {
  const customerId = 1;
  const response = await fetch(`api/fridge-contents/${customerId}`);
  const contents = await response.json();
  return contents;
};

export { getCurrentFridgeContents };
