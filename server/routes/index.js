const express = require('express');

const router = express.Router();
const db = require('../db/index');

// tasks to do, Sat Feb 24, 2018
  // comment out response.json mock data
  // connect queries to the 3 endpoints below (database to front end)
  // test if front end gets data using postman on http://localhost:3000/api/...
 
/* GET get fridge-content */
router.get('/fridge-contents/:costumerId', async (request, response) => {
  try {
    const fridgeContents = await db.select('customer_id').table('fridge_inventory');
    response.send(fridgeContents);
  }
  catch(err) {
    console.error('Error loading locations!', err);
    response.send(500, 'Internal server error');
  }
  /*
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
  */
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
    status: 'OPEN', // OPEN / CLOSE
    cart: [{ name: 'apple', amount: 4 }],
  });
});

module.exports = router;
