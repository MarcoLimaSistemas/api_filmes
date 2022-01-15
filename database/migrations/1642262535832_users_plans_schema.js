'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersPlansSchema extends Schema {
  up () {
    this.create('users_plans', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('plan_id').unsigned().references('id').inTable('plans')
      table.float('price')
      table.timestamps()
    })
  }

  down () {
    this.drop('users_plans')
  }
}

module.exports = UsersPlansSchema
