import gameSchema from '../schemas/gameSchema.js'

export default function postGameValidate(req, res, next) {
  const { error } = gameSchema.validate(req.body)

  if (error) return res.sendStatus(400)

  res.locals.type = 'games'

  next()
}
