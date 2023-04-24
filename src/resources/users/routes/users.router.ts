import { Router } from 'express'
import { authHandler } from '../../../middlewares/auth.middleware'
import { getUserInfo } from '../controllers'

export const usersRouter = Router()

usersRouter.get('/info', authHandler, getUserInfo)
