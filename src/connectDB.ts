import Knex from "knex";
require("dotenv").config();

export const knex = Knex({
  client: "pg",
  connection: {
    host: process.env.HOST_BD,
    port: Number(process.env.PORT_BD),
    user: process.env.USER_BD,
    password: process.env.PASSWORD_BD,
    database: process.env.NAME_BD,
  },
  pool: {
    min: 1,
    max: 10,
  },
});
