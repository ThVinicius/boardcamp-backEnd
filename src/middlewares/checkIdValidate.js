import connection from '../database/postgres.js'

export default async function checkIdValidate(req, res, next) {
  const { categoryId } = req.body

  const { rows: categories } = await connection.query(
    'SELECT * FROM categories WHERE id = $1 LIMIT 1',
    [categoryId]
  )

  if (categories.length === 0) return res.sendStatus(400)

  next()
}
