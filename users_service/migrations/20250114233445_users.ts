import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', function (table) {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.string('email', 255).notNullable();
    table.string('password', 255).notNullable();
    table.dateTime('birthDate');
    table.dateTime('createdAt').notNullable();
    table.dateTime('updatedAt').notNullable();
    table
      .integer('role_id')
      .unsigned()
      .index()
      .notNullable()
      .references('id')
      .inTable('roles');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
