import knex from 'knex';
import { configMySQL } from "../utils/configMySQL.js";

const knexCli = knex(configMySQL.db);

knexCli.schema.dropTableIfExists("productos")
  .then(() => {
    knexCli.schema
      .createTable("productos", (table) => {
        table.increments("id").primary();
        table.string("title", 50).notNullable();
        table.integer("price").notNullable();
        table.string("thumbnail", 300).notNullable();
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
