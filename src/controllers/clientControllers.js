import connection from '../database/postgres.js'

export async function getClient(req, res) {
  try {
    const { cpf } = req.query

    if (cpf !== undefined) {
      const clients = await connection.query(
        'SELECT * FROM customers WHERE cpf LIKE $1',
        [`${cpf}%`]
      )

      return res.status(200).send(clients.rows)
    }

    const clients = await connection.query('SELECT * FROM customers')

    return res.status(200).send(clients.rows)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

export async function postClient(req, res) {
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

export async function getClientById(req, res) {
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

export async function updateClient(req, res) {
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
