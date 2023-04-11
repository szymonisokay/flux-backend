import express, { Express, Request, json, urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import { authRouter } from './resources/auth/routers/auth.router'
import { errorHandler } from './middlewares/error.middleware'
import { connectToDb } from './db'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(cors<Request>())
app.use(json())
app.use(urlencoded({ extended: false }))

app.use('/api/auth/', authRouter)

app.use(errorHandler)

app.listen(port, async () => {
	connectToDb()
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
