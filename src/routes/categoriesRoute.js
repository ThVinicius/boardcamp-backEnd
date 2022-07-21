import { Router } from 'express'
import postCategoriesValidate from '../middlewares/postCategoriesValidate.js'
import checkNameValidate from '../middlewares/checkNameValidate.js'
import {
  getCategories,
  postCategories
} from '../controllers/categoriesControllers.js'

const route = Router()

route.get('/categories', getCategories)
route.post(
  '/categories',
  postCategoriesValidate,
  checkNameValidate,
  postCategories
)

export default route
