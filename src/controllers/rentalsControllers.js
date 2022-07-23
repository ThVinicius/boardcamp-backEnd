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
  const { customerId } = req.query

  const { gameId } = req.query

  let where = ''

  if (customerId !== undefined || gameId !== undefined) {
    const id = customerId !== undefined ? 'r."customerId"' : 'r."gameId"'

    const value = customerId !== undefined ? customerId : gameId

    where = `WHERE ${id} = ${value}`
  }

  try {
    const { rows: rentals } = await connection.query(`
    SELECT 
    r.*, 
    c.id AS "clientId", c.name AS "clientName",
    g.id AS "gameID", g.name AS "gameName", g."categoryId",
    categories.name AS "categoryName"
    FROM rentals r
    JOIN customers c ON r."customerId" = c.id
    JOIN games g ON r."gameId" = g.id
    JOIN categories ON g."categoryId" = categories.id
    ${where}
    `)

    const toSend = []

    for (const item of rentals) {
      const {
        id,
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee
      } = item

      const { clientId, clientName } = item

      const { gameID, gameName, categoryId, categoryName } = item

      const formatRentals = {
        id,
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
        customer: { id: clientId, name: clientName },
        game: { id: gameID, name: gameName, categoryId, categoryName }
      }

      toSend.push(formatRentals)
    }

    return res.status(200).send(toSend)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

export async function returnRentals(_, res) {
  const { rental } = res.locals

  const now = dayjs().format('YYYY-MM-DD')

  try {
    const rentDate = dayjs(rental[0].rentDate).format('YYYY-MM-DD')

    const daysDiff = dayjs(now).diff(dayjs(rentDate), 'd')

    const aux = rental[0].daysRented - daysDiff

    const delayFee = aux < 0 ? Math.abs(aux) * rental[0].pricePerDay : 0

    await connection.query(
      'UPDATE rentals SET "returnDate" = $1, "delayFee" = $2',
      [now, delayFee]
    )

    return res.sendStatus(200)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

export async function deleteRentals(req, res) {
  const { id } = req.params

  try {
    await connection.query('DELETE FROM rentals WHERE id = $1', [id])

    return res.sendStatus(200)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
