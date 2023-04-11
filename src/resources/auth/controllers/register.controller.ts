import { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'

import UserModel from '../models/user.model'
import { User, UserWithToken, registerModel } from '../interfaces/user.interface'
import { ErrorMessages } from '../../../shared/enums/error-messages.enum'
import { hashPassword } from '../../../utils/password-validation'
import { createToken } from '../../../utils/token-validation'
import { SuccessMessages } from '../../../shared/enums/success-messages.enum'
import { ResponseModel } from '../../../shared/interfaces/response.interface'

export const register = expressAsyncHandler(async (req: Request, res: Response) => {
	const { username, email, password } = req.body as registerModel

	if (!username || !email || !password) {
		res.status(400)
		throw new Error(ErrorMessages.PROVIDE_ALL_DATA)
	}

	const userExists = await UserModel.findOne({ email })

	if (userExists) {
		res.status(400)
		throw new Error(ErrorMessages.USER_EXISTS)
	}

	const hashedPassword: string = await hashPassword(password)

	const newUser: User = {
		username,
		email,
		password: hashedPassword,
		roles: ['User'],
	}

	const user = await UserModel.create(newUser)

	const token: string = createToken({ id: user._id.toString() })

	const userWithToken: UserWithToken = {
		user,
		token,
	}

	res.status(201).json({
		result: userWithToken,
		message: SuccessMessages.ACCOUNT_CREATED,
	} as ResponseModel<UserWithToken>)
})
