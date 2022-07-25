import connection from '../database/postgres.js'

export default async function returnRentalsValidate(req, res, next) {
  const { id } = req.params

  try {
    const { rows: rental } = await connection.query(
      `SELECT 
        r.id, TO_CHAR(r."rentDate", 'YYYY-MM-DD') AS "rentDate", r."daysRented", 
        (CURRENT_DATE - r."rentDate") AS daysDiff, r."returnDate",
        g."pricePerDay" 
        FROM rentals r 
        JOIN games g ON r."gameId" = g.id 
        WHERE r.id = $1 
        LIMIT 1`,
      [id]
    )

    if (rental.length === 0 || rental[0].returnDate !== null)
      return res.sendStatus(400)

    res.locals.rental = rental[0]

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
