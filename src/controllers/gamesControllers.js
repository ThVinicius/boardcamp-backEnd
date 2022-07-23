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

  const where =
    name !== undefined ? `WHERE LOWER(g.name) LIKE LOWER('${name}%')` : ''

  const offset = queryOffset !== undefined ? `OFFSET ${queryOffset}` : ''

  const limit = queryLimit !== undefined ? `LIMIT ${queryLimit}` : ''

  try {
    const { rows: games } = await connection.query(`
        SELECT g.*, c.name AS "categoryName" FROM games g 
        JOIN categories c ON g."categoryId" = c.id
        ${where}
        ORDER BY g.id
        ${offset}
        ${limit}
      `)

    return res.status(200).send(games)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
