const fs = require('fs');

// add the food raw data from the db/data/food.js
//   and map to a food object with the respective  KV pairs
const food;


// export the seed 
exports.seed = (knex, Promise) => {
  //delete ALL existing food
  return knex('food').del()
    .then(() => {
      // inserts seed entries
      return knex('food').insert(food);
    })
}


