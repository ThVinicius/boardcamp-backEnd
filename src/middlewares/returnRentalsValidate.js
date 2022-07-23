import connection from '../database/postgres.js'

export default async function returnRentalsValidate(req, res, next) {
  const id = Number(req.params.id)

  try {
    const { rows: rental } = await connection.query(
      'SELECT r.*, g."pricePerDay" FROM rentals r JOIN games g ON r."gameId" = g.id WHERE r.id = $1',
      [id]
    )

    if (rental.length === 0) return res.sendStatus(400)

    res.locals.rental = rental

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
