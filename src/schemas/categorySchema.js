import joi from 'joi'

const postCategorySchema = joi.object({
  name: joi.string().trim().required()
})

export default postCategorySchema
