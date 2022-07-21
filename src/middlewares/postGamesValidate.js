import postGamesSchema from '../schemas/postGamesSchema.js'

export default function postGamesValidate(req, res, next) {
  const { error } = postGamesSchema.validate(req.body)

  if (error) return res.sendStatus(400)

  res.locals.type = 'games'

  next()
}
