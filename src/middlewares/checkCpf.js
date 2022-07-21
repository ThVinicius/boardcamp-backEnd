import connection from '../database/postgres.js'

export default async function checkCpf(req, res, next) {
  const { table } = res.locals
  const { id } = req.params
  try {
    if (id !== undefined) {
      const checkCpf = await connection.query(
        `SELECT * FROM ${table} WHERE cpf = $1 AND id != $2 LIMIT 1`,
        [req.body.cpf, id]
      )

      if (checkCpf.rows.length > 0) return res.sendStatus(409)

      return next()
    }

    const checkCpf = await connection.query(
      `SELECT * FROM ${table} WHERE cpf = $1 LIMIT 1`,
      [req.body.cpf]
    )

    if (checkCpf.rows.length > 0) return res.sendStatus(409)

    return next()
  } catch (error) {}
}
