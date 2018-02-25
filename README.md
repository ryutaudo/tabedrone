# Tabedrone Web Application
App for food delivery service using drone simulation

## Setup



### Installing Node
Node should be installed globally if you don't have.
```
npm i -g node
```
### Installing Knex
Knex should be installed globally if you don't have.
```
npm i knex -g
```

### Postgres
Postgres should be installed. If you haven't installed it already, download and install the [PostgresApp](https://postgresapp.com/) and verify its working by running the command `psql` in your terminal.

Create a database called 'tabedrone'
```
echo "CREATE DATABASE tabedrone;" | psql
```

### Installing Dependency and Startup
To install dependencies:
```
yarn install
```
To run database migrations:
```
yarn migrate
```
To run to a previous database migration, known as a rollback:
```
yarn rollback
```
To insert data into a table, known as seed data:
```
yarn seed
```
To run backend express server
```
yarn start
```
To run front end webpack  server
```
yarn hack
```




