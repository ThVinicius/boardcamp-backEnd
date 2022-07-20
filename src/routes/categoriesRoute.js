import { Router } from 'express'
import postCategoriesValidate from '../middlewares/postCategoriesValidate.js'
import {
  getCategories,
  postCategories
} from '../controllers/categoriesControllers.js'

const route = Router()

route.get('/categories', getCategories)
route.post('/categories', postCategoriesValidate, postCategories)

export default route
