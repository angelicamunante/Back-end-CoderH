import knex from "knex";
import { configSQLite3 } from "./configMySQL.js";

export class SQLite3Functions {
  constructor(tableName) {
    this.knexCli = knex(configSQLite3.db);
    this.tableName = tableName;
  }
  //Listar todos:
  async getAll() {
    try {
      return await this.knexCli.from(this.tableName).select("*");
    } catch (err) {
      console.log(err);
    }
  }

  //Obterner uno:
  async getOneByID(id) {
    try {
      return await this.knexCli
        .from(this.tableName)
        .select("*")
        .where({ id: id });
    } catch (err) {
      console.log(err);
    }
  }

  //Crear uno:
  async create(obj) {
    try {
      return await this.knexCli(this.tableName).insert(obj);
    } catch (err) {
      console.log(err);
    }
  }
  //Actualizar uno:
  async update(id, obj) {
    try {
      return await this.knexCli
        .from(this.tableName)
        .where({ id: id })
        .update(obj);
    } catch (err) {
      console.log(err);
    }
  }

  //Eliminar uno:
  async delete(id) {
    try {
      return await this.knexCli.from(this.tableName).where({ id: id }).del();
    } catch (err) {
      console.log(err);
    }
  }

  //Cerrar conexión:
  async closeConnection() {
    this.knexCli.destroy();
  }
}