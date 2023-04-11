import { Router } from 'express'
import { register } from '../controllers/index'

export const authRouter = Router()

authRouter.post('/register', register)
