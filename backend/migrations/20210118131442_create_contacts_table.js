exports.up = function (knex) {
  return knex.schema.createTable('contacts', function (table) {
    table.increments()
    table.integer('user').unsigned()
    table.string('name')
    table.string('email')
    table.string('phone')
    table.string('type').defaultTo('personal')
    table.timestamps(true, true)

    table.foreign('user').references('id').inTable('users')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('contacts')
}
