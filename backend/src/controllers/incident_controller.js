const connection = require('../database/connection')

module.exports = {
  async index (require, response) {
    const { page = 1 } = require.query

    const [count] = await connection('incidents').count()

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.OngId')
      .limit(5)
      .offset((page - 1) * 5)
      .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.UF'])

    response.header('X-Total-Count', count['count(*)'])
    return response.json(incidents)
  },

  async create (require, response) {
    const { title, description, value } = require.body
    const ongId = require.headers.authorization

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ongId
    })

    return response.json({ id })
  },

  async delete (require, response) {
    const { id } = require.params
    const ongId = require.headers.authorization

    const incident = await connection('incidents')
      .where('id', id)
      .select('ongId')
      .first()

    if (incident.ongId !== ongId) return response.status(401).json({ error: 'Operation not permitted' })

    await connection('incidents').where('id', id).delete()

    return response.status(204).send()
  }
}
