import type { Knex } from "knex";
require("dotenv").config();

const config: { [key: string]: Knex.Config } = {
  production: {
    client: "pg",
    connection: {
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
  },
  test: {
    client: "pg",
    connection: {
      host: process.env.PGHOST ,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
    },
  }}

module.exports = config;
