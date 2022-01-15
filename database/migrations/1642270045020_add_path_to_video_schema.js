'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddPathToVideoSchema extends Schema {
  up () {
    this.table('videos', (table) => {
      table.string('url_link', 600)
    })
  }

  down () {
    this.table('add_path_to_videos', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddPathToVideoSchema
