import connection from '../database/postgres.js'

export async function postGame(req, res) {
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
  const { name } = req.query

  try {
    let games

    if (name === undefined) {
      games = await connection.query(
        'SELECT g.*, c.name AS "categoryName" FROM games g JOIN categories c ON g."categoryId" = c.id'
      )
    } else {
      games = await connection.query(
        'SELECT g.*, c.name AS "categoryName" FROM games g JOIN categories c ON g."categoryId" = c.id WHERE LOWER(g.name) LIKE LOWER($1)',
        [`${name}%`]
      )
    }

    return res.status(200).send(games.rows)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
