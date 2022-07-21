import { Router } from 'express'
import checkNameValidate from '../middlewares/checkNameValidate.js'
import postGamesValidate from '../middlewares/postGamesValidate.js'
import { postGames } from '../controllers/gamesControllers.js'

const route = Router()

route.post('/games', postGamesValidate, checkNameValidate, postGames)

export default route
