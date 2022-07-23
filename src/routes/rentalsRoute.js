import { Router } from 'express'
import postRentalsValidate from '../middlewares/postRentalsValidate.js'
import idParamsValidate from '../middlewares/idParamsValidate.js'
import returnRentalsValidate from '../middlewares/returnRentalsValidate.js'
import deleteRentalsValidate from '../middlewares/deleteRentalsValidate.js'
import {
  postRentals,
  getRentals,
  returnRentals,
  deleteRentals
} from '../controllers/rentalsControllers.js'

const route = Router()

route.post('/rentals', postRentalsValidate, postRentals)
route.get('/rentals', getRentals)
route.post(
  '/rentals/:id/return',
  idParamsValidate,
  returnRentalsValidate,
  returnRentals
)
route.delete(
  '/rentals/:id',
  idParamsValidate,
  deleteRentalsValidate,
  deleteRentals
)

export default route
