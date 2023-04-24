import express, { Express, Request, json, urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import { connectToDb } from './db'
import { errorHandler } from './middlewares/error.middleware'

import { authRouter } from './resources/auth/routes/auth.router'
import { usersRouter } from './resources/users/routes/users.router'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(cors<Request>())
app.use(json())
app.use(urlencoded({ extended: false }))

app.use('/api/auth/', authRouter)
app.use('/api/users/', usersRouter)

app.use(errorHandler)

app.listen(port, async () => {
	connectToDb()
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
