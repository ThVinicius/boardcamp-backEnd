import idParamsSchema from '../schemas/idParamsSchema.js'

export default function idParamsValidate(req, res, next) {
  const { error } = idParamsSchema.validate(req.params)

  if (error) return res.sendStatus(400)

  next()
}
