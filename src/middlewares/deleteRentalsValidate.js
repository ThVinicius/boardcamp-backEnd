import connection from '../database/postgres.js'

export default async function deleteRentalsValidate(req, res, next) {
  const { id } = req.params

  try {
    const { rows: rental } = await connection.query(
      'SELECT * FROM rentals WHERE id = $1',
      [id]
    )

    if (rental.length === 0) return res.sendStatus(404)

    if (rental[0].returnDate !== null) return res.sendStatus(400)

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
