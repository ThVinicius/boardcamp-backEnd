import joi from 'joi'

const queryStringCpfSchema = joi.object({ cpf: joi.number().required() })

export default queryStringCpfSchema
