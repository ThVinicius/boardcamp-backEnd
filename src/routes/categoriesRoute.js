import { Router } from 'express'
import categoryValidate from '../middlewares/categoryValidate.js'
import checkNameValidate from '../middlewares/checkNameValidate.js'
import {
  getCategories,
  postCategory
} from '../controllers/categoryControllers.js'

const route = Router()

route.get('/categories', getCategories)
route.post('/categories', categoryValidate, checkNameValidate, postCategory)

export default route
