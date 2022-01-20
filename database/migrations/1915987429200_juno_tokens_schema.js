"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class JunoTokensSchema extends Schema {
  up() {
    this.create("juno_tokens", table => {
      table.increments();
      table.string("token");
      table.timestamps();
    });
  }

  down() {
    this.drop("juno_tokens");
  }
}

module.exports = JunoTokensSchema;
