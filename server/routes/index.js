const express = require('express');

const router = express.Router();


/* GET get fridge-content */
router.get('/fridge-contents/:costumerId', (request, response) => {
  response.json([
    {
      id: 1, // customer based unique auto-increment. start: 1
      name: 'apple',
      amount: 3,
    },
    {
      id: 2, // customer based unique auto-increment. start: 1
      name: 'orange',
      amount: 5,
    },
    {
      id: 3, // customer based unique auto-increment. start: 1
      name: 'milk',
      amount: 2,
    },
    {
      id: 4, // customer based unique auto-increment. start: 1
      name: 'wine',
      amount: 0,
    },
  ]);
});


/* POST post order */
router.post('/orders', (request, response) => {
  /**
   * is inside the request.
   * customerId: 1
   * cart: [{name: 'apple', amout: 4}, {...}]
   */
  response.json({
    orderId: 1,
    customerId: 1,
    status: 'OPEN',
  });
});

/* GET get order */
router.get('/orders/:orderId', (request, response) => {
  /**
   * is inside the request.
   * name: cart
   * value: [{name: 'apple', amout: 4}, {...}]
   */
  response.json({
    orderId: 1,
    status: 'OPEN', // OPEN / CLOSEfix
    cart: [{ name: 'apple', amount: 4 }],
  });
});

module.exports = router;
