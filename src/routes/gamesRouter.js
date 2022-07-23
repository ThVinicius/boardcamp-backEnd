import { Router } from 'express'
import checkNameValidate from '../middlewares/checkNameValidate.js'
import postGameValidate from '../middlewares/postGameValidate.js'
import queryGameValidate from '../middlewares/queryGameValidate.js'
import { postGame, getGames } from '../controllers/gameControllers.js'

const route = Router()

route.post('/games', postGameValidate, checkNameValidate, postGame)
route.get('/games', queryGameValidate, getGames)

export default route
