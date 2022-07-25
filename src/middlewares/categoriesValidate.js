import categorySchema from '../schemas/categorySchema.js'

export default function categoriesValidate(req, res, next) {
  const { error } = categorySchema.validate(req.body)

  if (error) return res.sendStatus(400)

  res.locals.table = 'categories'
  next()
}
