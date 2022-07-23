import connection from '../database/postgres.js'

export async function getCategories(req, res) {
  const { offset: queryOffset, limit: queryLimit } = req.query

  const offset = queryOffset !== undefined ? `OFFSET ${queryOffset}` : ''

  const limit = queryLimit !== undefined ? `LIMIT ${queryLimit}` : ''

  try {
    let { rows: categories } = await connection.query(
      `SELECT * FROM categories ORDER BY id ${offset} ${limit}`
    )

    return res.status(200).send(categories)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

export async function postCategories(req, res) {
  const { name } = req.body
  try {
    await connection.query('INSERT INTO categories (name) VALUES ($1)', [name])

    return res.sendStatus(201)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
