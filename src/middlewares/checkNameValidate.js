import connection from '../database/postgres.js'

export default async function checkNameValidate(req, res, next) {
  try {
    const { type } = res.locals

    const checkName = await connection.query(
      `SELECT * FROM ${type} WHERE name = $1 LIMIT 1`,
      [req.body.name]
    )

    if (checkName.rows.length > 0) return res.sendStatus(409)

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
