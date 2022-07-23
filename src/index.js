import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import categoriesRoute from './routes/categoriesRoute.js'
import gamesRoute from './routes/gamesRouter.js'
import customersRoute from './routes/customersRoute.js'
import rentalsRoute from './routes/rentalsRoute.js'

const app = express()
app.use(json())
dotenv.config()
app.use(cors())

app.use(categoriesRoute)
app.use(gamesRoute)
app.use(customersRoute)
app.use(rentalsRoute)

app.listen(process.env.PORT)
