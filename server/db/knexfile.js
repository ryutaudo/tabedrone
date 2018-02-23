// Update with your config settings.

// module.exports = {

//   development: {
//     client: 'sqlite3',
//     connection: {
//       filename: './dev.sqlite3'
//     }
//   },

//   staging: {
//     client: 'postgresql',
//     connection: {
//       database: 'my_db',
//       user:     'username',
//       password: 'password'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   },

//   production: {
//     client: 'postgresql',
//     connection: {
//       database: 'my_db',
//       user:     'username',
//       password: 'password'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   }

// };


// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || `postgres://${process.env['USER']}@127.0.0.1:5432/tabedrone`,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/migrations'
    },
    searchPath: 'public',
    seeds: {
      directory: __dirname + '/seeds',
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL || `postgres://${process.env['USER']}@127.0.0.1:5432/tabedrone`,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/migrations'
    },
    searchPath: 'public',
    seeds: {
      directory: __dirname + '/seeds',
    }
  },
};
