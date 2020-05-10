const knex = require('knex')
const configuration = require('../../knexfile')
const { NODE_ENV } = process.env

const connection = knex(configuration[NODE_ENV || 'development'])

module.exports = connection
