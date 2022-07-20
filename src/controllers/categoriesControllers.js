import connection from '../database/postgres.js'

export async function getCategories(_, res) {
  try {
    const { rows } = await connection.query('SELECT * FROM categories')

    return res.status(200).send(rows)
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
