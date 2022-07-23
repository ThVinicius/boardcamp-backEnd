import { Router } from 'express'
import queryStringCpfValidate from '../middlewares/queryStringCpfValidate.js'
import clientValidate from '../middlewares/clientValidate.js'
import idParamsValidate from '../middlewares/idParamsValidate.js'
import checkCpf from '../middlewares/checkCpf.js'
import {
  getClient,
  postClient,
  getClientById,
  updateClient
} from '../controllers/clientControllers.js'

const route = Router()

route.get('/customers', queryStringCpfValidate, getClient)
route.post('/customers', clientValidate, checkCpf, postClient)
route.get('/customers/:id', idParamsValidate, getClientById)
route.put(
  '/customers/:id',
  idParamsValidate,
  clientValidate,
  checkCpf,
  updateClient
)

export default route
