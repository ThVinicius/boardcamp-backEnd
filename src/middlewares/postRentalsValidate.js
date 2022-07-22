import connection from '../database/postgres.js'
import rentalsSchema from '../schemas/rentalsSchema.js'

export default async function postRentalsValidate(req, res, next) {
  const { error } = rentalsSchema.validate(req.body)

  if (error) return res.sendStatus(400)

  try {
    const { customerId, gameId } = req.body

    const { rows: customer } = await connection.query(
      'SELECT id FROM customers WHERE id = $1 LIMIT 1',
      [customerId]
    )

    if (customer.length === 0) return res.sendStatus(400)

    const { rows: game } = await connection.query(
      'SELECT * FROM games WHERE id = $1 LIMIT 1',
      [gameId]
    )

    if (game.length === 0) return res.sendStatus(400)

    const limit = game[0].stockTotal

    const { rows: checkRentals } = await connection.query(
      'SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL LIMIT $2',
      [gameId, limit]
    )

    if (checkRentals.length === limit) return res.sendStatus(400)

    res.locals.pricePerDay = game[0].pricePerDay

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
