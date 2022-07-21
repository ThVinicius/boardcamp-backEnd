import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import categoryRoute from './routes/categoryRoute.js'
import gameRoute from './routes/gameRouter.js'
import clientRoute from './routes/clientRoute.js'

const app = express()
app.use(json())
dotenv.config()
app.use(cors())

app.use(categoryRoute)
app.use(gameRoute)
app.use(clientRoute)

app.listen(process.env.PORT)
