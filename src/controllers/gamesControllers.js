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
