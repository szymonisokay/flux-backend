import { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import UserModel from '../../auth/models/user.model'
import { ResponseModel } from '../../../shared/interfaces/response.interface'
import { SerializedUser } from '../../auth/interfaces/user.interface'
import { serializeUser } from '../../../utils/serialize-user'
import { ErrorMessages } from '../../../shared/enums/error-messages.enum'
import { SuccessMessages } from '../../../shared/enums/success-messages.enum'

export const getUserInfo = expressAsyncHandler(async (req: Request, res: Response) => {
	const { authId } = req

	const user = await UserModel.findById(authId)

	if (!user) {
		res.status(400)
		throw new Error(ErrorMessages.USER_DOES_NOT_EXIST)
	}

	const result: ResponseModel<SerializedUser> = {
		result: serializeUser(user),
		message: SuccessMessages.FETCHED_USER,
	}

	res.status(200).json(result)
})
