import { Router } from 'express'
import checkNameValidate from '../middlewares/checkNameValidate.js'
import gamesValidate from '../middlewares/gamesValidate.js'
import queryValidate from '../middlewares/queryValidate.js'
import checkIdValidate from '../middlewares/checkIdValidate.js'
import { postGames, getGames } from '../controllers/gamesControllers.js'

const route = Router()

route.get('/games', queryValidate, getGames)
route.post(
  '/games',
  gamesValidate,
  checkIdValidate,
  checkNameValidate,
  postGames
)

export default route
