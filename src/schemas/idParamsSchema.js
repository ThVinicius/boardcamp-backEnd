import joi from 'joi'

const idParamsSchema = joi.object({
  id: joi.number().greater(0).required()
})

export default idParamsSchema
