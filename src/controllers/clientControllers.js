import connection from '../database/postgres.js'

export async function getClient(req, res) {
  try {
    const { cpf } = req.query

    if (cpf !== undefined) {
      const clients = await connection.query(
        'SELECT * FROM clientes WHERE cpf LIKE $1',
        [`${cpf}%`]
      )

      return res.status(200).send(clients)
    }

    const clients = await connection.query('SELECT * FROM clientes')

    return res.status(200).send(clients)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
