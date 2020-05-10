const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')
const OngController = require('./controllers/ong_controller')
const IncidentController = require('./controllers/incident_controller')
const ProfileController = require('./controllers/profile_controller')
const SessionController = require('./controllers/session_controller')

const routes = express.Router()

routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngController.index)
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object({
       name: Joi.string().required(),
       email: Joi.string().required().email(),
       whatsapp: Joi.string().min(10).max(11).required(),
       city: Joi.string().required(),
       UF: Joi.string().length(2).required()
    })
}), OngController.create)

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.index)

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.index)
routes.post('/incidents', IncidentController.create)

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.delete)

module.exports = routes
