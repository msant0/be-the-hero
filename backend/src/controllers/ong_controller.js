const generateUniqueId = require('../utils/functions/generateUniqueId')
const connection = require('../database/connection')

module.exports = {
  async index (require, response) {
    const ongs = await connection('ongs').select('*')
    return response.json(ongs)
  },

  async create (require, response) {
    const { name, email, whatsapp, city, UF } = require.body
    const id = generateUniqueId

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      UF
    })

    return response.json({ id })
  }
}
