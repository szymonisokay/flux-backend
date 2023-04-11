import { Request, Response, NextFunction } from 'express'
import { ResponseModel } from '../shared/interfaces/response.interface'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	const statusCode: number = res.statusCode ? res.statusCode : 500

	res.status(statusCode)
	res.json({ result: null, message: err.message } as ResponseModel<null>)
}
