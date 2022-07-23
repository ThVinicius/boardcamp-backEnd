import { Router } from 'express'
import checkNameValidate from '../middlewares/checkNameValidate.js'
import gamesValidate from '../middlewares/gamesValidate.js'
import queryValidate from '../middlewares/queryValidate.js'
import { postGames, getGames } from '../controllers/gamesControllers.js'

const route = Router()

route.post('/games', gamesValidate, checkNameValidate, postGames)
route.get('/games', queryValidate, getGames)

export default route
