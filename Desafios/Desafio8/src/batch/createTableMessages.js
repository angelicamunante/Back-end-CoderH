import knex from 'knex';
import { configSQLite3 } from "../utils/configMySQL.js";

const knexCli = knex(configSQLite3.db);

knexCli.schema.dropTableIfExists("mensajes").then(() => {
  knexCli.schema
    .createTable("mensajes", (table) => {
      table.increments("id").primary();
      table.string("user", 50).notNullable();
      table.string("comment", 150).notNullable();
      table.string("time", 50).notNullable();
    })
    .then(() => console.log("Tabla creada."))
    .catch((err) => {
      console.log(err);
      throw err;
    })
    .finally(() => {
      knexCli.destroy();
    });
});
