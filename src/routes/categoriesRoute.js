import { Router } from 'express'
import categoriesValidate from '../middlewares/categoriesValidate.js'
import checkNameValidate from '../middlewares/checkNameValidate.js'
import queryValidate from '../middlewares/queryValidate.js'
import {
  getCategories,
  postCategories
} from '../controllers/categoriesControllers.js'

const route = Router()

route.get('/categories', queryValidate, getCategories)
route.post('/categories', categoriesValidate, checkNameValidate, postCategories)

export default route
