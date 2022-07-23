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
  const { customerId, gameId, status, startDate } = req.query
  const { offset: queryOffset, limit: queryLimit } = req.query
  const { order: queryOrder, desc: queryDesc } = req.query

  let arrQueries = Object.entries({ customerId, gameId, status, startDate })

  arrQueries = arrQueries.filter(queryValue => queryValue[1] !== undefined)

  let where = ''

  arrQueries.forEach((query, index) => {
    const whereOrAnd = index === 0 ? 'WHERE' : 'AND'

    switch (true) {
      case query[0] === 'customerId' || query[0] === 'gameId':
        const value = customerId !== undefined ? customerId : gameId

        where += `${whereOrAnd} r."${query[0]}" = ${value}`
        return

      case query[0] === 'status':
        const statusValue = status === 'open' ? 'IS NULL' : 'IS NOT NULL'

        where += `${whereOrAnd} r."returnDate" ${statusValue}`
        return

      default:
        where += `${whereOrAnd} r."rentDate" >= '${startDate}'`
        return
    }
  })

  const offset = queryOffset !== undefined ? `OFFSET ${queryOffset}` : ''

  const limit = queryLimit !== undefined ? `LIMIT ${queryLimit}` : ''

  const order = queryOrder !== undefined ? `"${queryOrder}"` : 'id'

  const desc = queryDesc !== undefined ? 'DESC' : ''

  try {
    const { rows: rentals } = await connection.query(`
      SELECT 
      r.*, 
      JSON_BUILD_OBJECT('id', c.id, 'name', c.name) AS customer,
      JSON_BUILD_OBJECT('id', g.id, 'name', g.name, 'categoryId', g."categoryId", 'categoryName', categories.name) AS game
      FROM rentals r
      JOIN customers c ON r."customerId" = c.id
      JOIN games g ON r."gameId" = g.id
      JOIN categories ON g."categoryId" = categories.id
      ${where}
      ORDER BY r.${order}
      ${desc}
      ${offset}
      ${limit}
    `)

    return res.status(200).send(rentals)
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
