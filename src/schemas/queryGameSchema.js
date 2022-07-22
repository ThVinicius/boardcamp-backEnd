import joi from 'joi'

const queryGameSchema = joi.object({ name: joi.string().trim().required() })

export default queryGameSchema
