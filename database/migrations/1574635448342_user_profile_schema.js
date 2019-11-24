'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserProfileSchema extends Schema {
  up () {
    this.create('user_profiles', (table) => {
	  table.increments()
	  table
		.integer('user_id')
		.unsigned()
		.references('id')
		.inTable('users')
		.onUpdate('CASCADE')
		.onDelete('CASCADE')
	  table.string('first_name')
	  table.string('last_name')
	  table.string('user_role')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_profiles')
  }
}

module.exports = UserProfileSchema
