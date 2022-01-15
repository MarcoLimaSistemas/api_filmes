'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddImageToVideoSchema extends Schema {
  up () {
    this.table('videos', (table) => {
      table.integer('image_id').unsigned().references('id').inTable('images')
    })
  }

  down () {
    this.table('add_image_to_videos', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddImageToVideoSchema
