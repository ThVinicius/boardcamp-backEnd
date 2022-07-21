import postCategoriesSchema from '../schemas/postCategoriesSchema.js'

export default function postCategoriesValidate(req, res, next) {
  const { error } = postCategoriesSchema.validate(req.body)

  if (error) return res.sendStatus(400)

  res.locals.type = 'categories'
  next()
}
