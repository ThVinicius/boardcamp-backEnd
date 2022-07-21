import clientSchema from '../schemas/clientSchema.js'

export default async function clientValidate(req, res, next) {
  const { error } = clientSchema.validate(req.body)

  if (error) return res.sendStatus(400)

  res.locals.table = 'customers'

  next()
}
