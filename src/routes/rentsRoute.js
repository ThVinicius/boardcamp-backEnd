import { Router } from 'express'
import postRentalsValidate from '../middlewares/postRentalsValidate.js'
import { postRentals, getRentals } from '../controllers/rentalsControllers.js'

const route = Router()

route.post('/rentals', postRentalsValidate, postRentals)
route.get('/rentals', getRentals)

export default route
