const express = require('express');

const router = express.Router();


/* GET get fridge-content */
router.get('/fridge-contents/:costumerId', (request, response) => {
  response.json([
    {
      'id': 1, //customer based unique auto-increment. start: 1 
      'name': 'apple',
      'amount': 3,
    },
    {
      'id': 2, //customer based unique auto-increment. start: 1 
      'name': 'orange',
      'amount': 5,
    },
    {
      'id': 3, //customer based unique auto-increment. start: 1 
      'name': 'milk',
      'amount': 2,
    },
    {
      'id': 4, //customer based unique auto-increment. start: 1 
      'name': 'wine',
      'amount': 0,
    },
  ]);
});


/* GET get order */
router.post('/order/:costumerId', (request, response) => {
  /**
   * is inside the request.
   * name: cart
   * value: [{id: 4}, {}]
   */
  response.json([
    {
      'id': 1, //customer based unique auto-increment. start: 1 
      'name': 'apple',
      'amount': 3,
    },
    {
      'id': 2, //customer based unique auto-increment. start: 1 
      'name': 'orange',
      'amount': 5,
    },
    {
      'id': 3, //customer based unique auto-increment. start: 1 
      'name': 'milk',
      'amount': 2,
    },
    {
      'id': 4, //customer based unique auto-increment. start: 1 
      'name': 'wine',
      'amount': 1,
    },
  ]);
});

module.exports = router;
