import joi from 'joi'

const querySchema = joi
  .object({
    cpf: joi.number(),
    name: joi.string().trim(),
    offset: joi.number(),
    limit: joi.number(),
    customerId: joi.number().greater(0),
    gameId: joi.number().greater(0),
    order: joi.string(),
    desc: joi.string().valid('true'),
    status: joi.string().valid('open', 'closed'),
    startDate: joi.date()
  })
  .oxor('customerId', 'gameId')

export default querySchema
