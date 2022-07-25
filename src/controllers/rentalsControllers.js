import connection from '../database/postgres.js'

export async function postRentals(req, res) {
  const { customerId, gameId, daysRented } = req.body

  const { pricePerDay } = res.locals

  try {
    const originalPrice = pricePerDay * daysRented

    await connection.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee" ) VALUES ($1, $2, CURRENT_DATE, $3, $4, $5, $6)`,
      [customerId, gameId, daysRented, null, originalPrice, null]
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
  const { daysDiff, daysRented, pricePerDay, id } = res.locals.rental

  try {
    const calc = daysDiff - daysRented

    const delayFee = calc > 0 ? calc * pricePerDay : 0

    await connection.query(
      'UPDATE rentals SET "returnDate" = CURRENT_DATE, "delayFee" = $1 WHERE id = $2',
      [delayFee, id]
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

export async function getMetrics(_, res) {
  try {
    const { rows: metrics } = await connection.query(`
      SELECT 
        SUM("originalPrice" + COALESCE("delayFee", 0)) AS revenue,
        COUNT(id) AS rentals,
        AVG("originalPrice" + COALESCE("delayFee", 0)) AS average
      FROM rentals
    `)

    return res.status(200).send(metrics[0])
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
