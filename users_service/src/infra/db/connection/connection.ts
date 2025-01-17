import knex from 'knex';

export const db = knex({
  client: 'mysql2',
  connection: {
    host: process.env.HOST || 'mysql',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'db',
  },
});
