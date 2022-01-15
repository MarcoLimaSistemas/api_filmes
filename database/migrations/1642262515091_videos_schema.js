'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VideosSchema extends Schema {
  up () {
    this.create('videos', (table) => {
      table.increments()
      table.integer('categorie_id').unsigned().references('id').inTable('categories')
      table.string('title')
      table.string('description', 6000)
      table.string('cast')
      table.timestamps()
    })
  }

  down () {
    this.drop('videos')
  }
}

module.exports = VideosSchema
