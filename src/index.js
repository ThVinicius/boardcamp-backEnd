import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import categoriesRoute from './routes/categoriesRoute.js'

const app = express()
app.use(json())
dotenv.config()
app.use(cors())

app.use(categoriesRoute)

app.listen(process.env.PORT)
