import joi from 'joi'

const postCategoriesSchema = joi.object({
  name: joi.string().trim().required()
})

export default postCategoriesSchema
