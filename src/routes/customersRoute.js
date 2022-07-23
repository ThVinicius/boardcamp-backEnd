import { Router } from 'express'
import queryValidate from '../middlewares/queryValidate.js'
import customersValidate from '../middlewares/customersValidate.js'
import idParamsValidate from '../middlewares/idParamsValidate.js'
import checkCpf from '../middlewares/checkCpf.js'
import {
  getCustomers,
  postCustomers,
  getCustomersById,
  updateCustomers
} from '../controllers/customersControllers.js'

const route = Router()

route.get('/customers', queryValidate, getCustomers)
route.post('/customers', customersValidate, checkCpf, postCustomers)
route.get('/customers/:id', idParamsValidate, getCustomersById)
route.put(
  '/customers/:id',
  idParamsValidate,
  customersValidate,
  checkCpf,
  updateCustomers
)

export default route
