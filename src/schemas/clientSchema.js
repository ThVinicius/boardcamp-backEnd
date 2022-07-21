import joi from 'joi'

const phoneRegex = /^\d{10,11}$/

const cpfRegex = /^\d{11}$/

const postClientSchema = joi.object({
  name: joi.string().trim().required(),
  phone: joi.string().min(10).max(11).pattern(phoneRegex).required(),
  cpf: joi.string().length(11).pattern(cpfRegex).required(),
  birthday: joi.date().less('now').required()
})

export default postClientSchema
