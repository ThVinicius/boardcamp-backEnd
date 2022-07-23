import customersSchema from '../schemas/customersSchema.js'

export default async function customersValidate(req, res, next) {
  const { error } = customersSchema.validate(req.body)

  if (error) return res.sendStatus(400)

  res.locals.table = 'customers'

  next()
}
