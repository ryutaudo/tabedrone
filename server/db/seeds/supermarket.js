// export the seed
exports.seed = knex => knex('supermarket').del()
  .then(() => knex('supermarket').insert([
    { name: 'Seijo Ishii Nishi Azabu Supermarket', longitude: 35.65914, latitude: 139.7210875 },
    { name: 'MY BASKET Nishiazabu 3-chome Store', longitude: 35.6582639, latitude: 139.7271252 },
    { name: 'SEIJO ISHII Roppongi Hills', longitude: 35.661827, latitude: 139.7301775 },
    { name: 'LINCOS Roppongi Hills', longitude: 35.6584251, latitude: 139.7321436 },
    { name: 'Daiei Azabujuban', longitude: 35.6562611, latitude: 139.7338468 },
    { name: '小田急商事（株） 事業本部ショップ新宿店', longitude: 35.691326, latitude: 139.6995172 },
    { name: 'sanpei store', longitude: 35.6933192, latitude: 139.7018963 },
  ]));

