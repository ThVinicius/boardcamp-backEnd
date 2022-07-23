import gamesSchema from '../schemas/gamesSchema.js'

export default function gamesValidate(req, res, next) {
  const { error } = gamesSchema.validate(req.body)

  if (error) return res.sendStatus(400)

  res.locals.type = 'games'

  next()
}
