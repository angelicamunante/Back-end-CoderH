import path from "path";
import { fileURLToPath } from 'url';

export const configMySQL = {
  db: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: '3307',
      user: 'angelica',
      password: 'angelica02',
      database: 'ecommerce',
    },
  },
};

export const configSQLite3 = {
  db: {
    client: 'better-sqlite3',
    connection: {
    filename: path.join(path.dirname(fileURLToPath(import.meta.url)), "../database/ecommerce.sqlite"),
    },
    useNullAsDefault: true,
  },
};