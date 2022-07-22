import connection from '../database/postgres.js'
import dayjs from 'dayjs'

export async function postRentals(req, res) {
  const { customerId, gameId, daysRented } = req.body

  const { pricePerDay } = res.locals

  const now = dayjs().format('YYYY-MM-DD')

  try {
    const originalPrice = pricePerDay * daysRented

    await connection.query(
      'INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee" ) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [customerId, gameId, now, daysRented, null, originalPrice, null]
    )

    return res.sendStatus(201)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

export async function getRentals(req, res) {
  try {
    const { rows: rentals } = await connection.query('SELECT * FROM rentals')
    return res.send(rentals)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
