import queryStringCpfSchema from '../schemas/queryStringCpfSchema.js'

export default function queryStringCpfValidate(req, res, next) {
  if (req.query === undefined) next()

  const { error } = queryStringCpfSchema.validate(req.query)

  if (error) return res.sendStatus(400)

  next()
}
