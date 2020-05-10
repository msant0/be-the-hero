const connection = require('../database/connection')

module.exports = {
  async index (require, response) {
    const ongId = require.headers.authorization

    const incidents = await connection('incidents')
      .where('ongId', ongId)
      .select('*')

    return response.json(incidents)
  }
}
