 
const { Model } = require('objection');
const knex = require('../config/config');

// Give the knex instance to objection.
Model.knex(knex);


// Person model.
class Users extends Model {
    static get tableName() {
        return 'users';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['email'],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
            }
        }
    }
}
module.exports = Users;