import connection from '../database/postgres.js'

export async function getCustomers(req, res) {
  const { cpf, offset: queryOffset, limit: queryLimit } = req.query

  const where = cpf !== undefined ? `WHERE cpf LIKE '${cpf}%'` : ''

  const offset = queryOffset !== undefined ? `OFFSET ${queryOffset}` : ''

  const limit = queryLimit !== undefined ? `LIMIT ${queryLimit}` : ''

  try {
    const { rows: clients } = await connection.query(
      `SELECT * FROM customers ${where} ORDER BY id ${offset} ${limit}`
    )

    return res.status(200).send(clients)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

export async function postCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body

  try {
    await connection.query(
      'INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)',
      [name, phone, cpf, birthday]
    )

    return res.sendStatus(201)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

export async function getCustomersById(req, res) {
  const { id } = req.params

  try {
    const checkId = await connection.query(
      'SELECT * FROM customers WHERE id = $1 LIMIT 1',
      [id]
    )

    if (checkId.rows.length === 0) return res.sendStatus(404)

    return res.status(200).send(checkId.rows[0])
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

export async function updateCustomers(req, res) {
  try {
    const { name, phone, cpf, birthday } = req.body
    const { id } = req.params

    await connection.query(
      `UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5`,
      [name, phone, cpf, birthday, id]
    )
    return res.sendStatus(200)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
