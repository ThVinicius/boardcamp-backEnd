import joi from 'joi'

const gamesSchema = joi.object({
  name: joi.string().trim().required(),
  stockTotal: joi.number().greater(0).required(),
  pricePerDay: joi.number().greater(0).required(),
  categoryId: joi.number().required(),
  image: joi.string().uri().required()
})

export default gamesSchema
