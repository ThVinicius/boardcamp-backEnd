import postCategoriesSchema from '../schemas/postCategoriesSchema.js'
import connection from '../database/postgres.js'

export default async function postCategoriesValidate(req, res, next) {
  try {
    const { error } = postCategoriesSchema.validate(req.body)

    if (error) return res.sendStatus(400)

    const checkName = await connection.query(
      'SELECT * FROM categories WHERE name = $1',
      [req.body.name]
    )

    if (checkName.rows.length > 0) return res.sendStatus(409)

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
