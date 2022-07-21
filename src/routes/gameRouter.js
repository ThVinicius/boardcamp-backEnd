import { Router } from 'express'
import checkNameValidate from '../middlewares/checkNameValidate.js'
import postGameValidate from '../middlewares/postGameValidate.js'
import { postGame } from '../controllers/gameControllers.js'

const route = Router()

route.post('/games', postGameValidate, checkNameValidate, postGame)

export default route
