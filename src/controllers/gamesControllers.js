import connection from '../database/postgres.js'

export async function postGames(req, res) {
  try {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body

    const column = 'name, image, "categoryId", "pricePerDay", "stockTotal"'

    await connection.query(
      `INSERT INTO games (${column}) VALUES ( $1, $2, $3, $4, $5 )`,
      [name, image, categoryId, pricePerDay, stockTotal]
    )

    res.sendStatus(201)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

export async function getGames(req, res) {
  const { name, offset: queryOffset, limit: queryLimit } = req.query
  const { order: queryOrder, desc: queryDesc } = req.query

  const where =
    name !== undefined ? `WHERE LOWER(g.name) LIKE LOWER('${name}%')` : ''

  const offset = queryOffset !== undefined ? `OFFSET ${queryOffset}` : ''

  const limit = queryLimit !== undefined ? `LIMIT ${queryLimit}` : ''

  const order = queryOrder !== undefined ? `"${queryOrder}"` : 'id'

  const desc = queryDesc !== undefined ? 'DESC' : ''

  try {
    const { rows: games } = await connection.query(`
        SELECT 
          g.*, c.name AS "categoryName", COUNT(r."gameId") AS "rentalsCount" 
          FROM games g 
          JOIN categories c ON g."categoryId" = c.id
          LEFT JOIN rentals r ON g.id = r."gameId"
          ${where}
          GROUP BY g.id, c.name
          ORDER BY g.${order}
          ${desc}
          ${offset}
          ${limit}
      `)

    return res.status(200).send(games)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
