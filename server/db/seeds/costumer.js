// export the seed
exports.seed = knex => knex('customer').del()
  .then(() => knex('customer').insert([
    { name: 'code chrysalis', longitude: 139.727437, latitude: 35.658036 },
    { name: 'christian', longitude: 35.661618, latitude: 139.727845 },
    { name: 'elia', longitude: 35.689104, latitude: 139.701535 },
    { name: 'ryuta', longitude: 35.6807648, latitude: 139.7506844 },
  ]));
