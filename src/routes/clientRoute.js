import { Router } from 'express'
import queryStringCpfValidate from '../middlewares/queryStringCpfValidate.js'
import { getClient } from '../controllers/clientControllers.js'

const route = Router()

route.get('/clientes', queryStringCpfValidate, getClient)

export default route
