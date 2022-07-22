import queryGameSchema from '../schemas/queryGameSchema.js'

export default function queryGameValidate(req, res, next) {
  if (req.query.name === undefined) return next()

  const { error } = queryGameSchema.validate(req.query)

  if (error) return res.sendStatus(400)

  next()
}
