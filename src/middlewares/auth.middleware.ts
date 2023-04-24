import { NextFunction, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { verifyToken } from '../utils/token-validation'
import { JsonWebTokenError } from 'jsonwebtoken'
import { TokenPayload } from '../shared/interfaces/token-payload.interface'
import { ErrorMessages } from '../shared/enums/error-messages.enum'

export const authHandler = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	let token

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1]

			const decoded = verifyToken(token) as TokenPayload
			req.authId = decoded.id

			next()
		} catch (error: any) {
			if (error instanceof JsonWebTokenError) {
				if (error.name === 'TokenExpiredError') {
					res.status(401)
					throw new Error(ErrorMessages.TOKEN_EXPIRED)
				}

				res.status(401)
				throw new Error(ErrorMessages.NOT_AUTHORIZED)
			}
		}
	}

	if (!token) {
		res.status(401)
		throw new Error(ErrorMessages.TOKEN_NOT_PASSED)
	}
})
