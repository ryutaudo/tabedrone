// export the seed
exports.seed = knex => knex('product').del()
  .then(() => knex('product').insert([
    { name: 'apple' },
    { name: 'orange' },
    { name: 'milk' },
    { name: 'wine' },
  ]));

