import queryCpfSchema from '../schemas/queryCpfSchema.js'

export default function queryStringCpfValidate(req, res, next) {
  if (req.query.cpf === undefined) return next()

  const { error } = queryCpfSchema.validate(req.query)

  if (error) return res.sendStatus(400)

  next()
}
