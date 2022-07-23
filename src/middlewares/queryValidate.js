import querySchema from '../schemas/querySchema.js'

export default function queryValidate(req, res, next) {
  const { error } = querySchema.validate(req.query)

  if (error) return res.sendStatus(400)

  next()
}
