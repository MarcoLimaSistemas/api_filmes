'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterTokenLengthSchema extends Schema {
  up () {
    this.table('juno_tokens', (table) => {
      table.string('token', 10000).alter()
    })
  }

  down () {
    this.table('alter_token_lengths', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AlterTokenLengthSchema
