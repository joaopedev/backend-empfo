import type { Knex } from "knex";
require("dotenv").config();

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      user: process.env.USER_BD,
      password: process.env.PASSWORD_BD,
      database: process.env.NAME_BD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },
};

module.exports = config;
