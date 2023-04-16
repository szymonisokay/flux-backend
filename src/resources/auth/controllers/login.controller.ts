import { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { UserWithToken, loginModel } from '../interfaces/user.interface'
import { ErrorMessages } from '../../../shared/enums/error-messages.enum'
import UserModel from '../models/user.model'
import { validatePassword } from '../../../utils/password-validation'
import { createToken } from '../../../utils/token-validation'
import { ResponseModel } from '../../../shared/interfaces/response.interface'
import { SuccessMessages } from '../../../shared/enums/success-messages.enum'
import { serializeUser } from '../../../utils/serialize-user'

export const login = expressAsyncHandler(async (req: Request, res: Response) => {
	const { email, password, rememberMe } = req.body as loginModel

	if (!email || !password) {
		res.status(400)
		throw new Error(ErrorMessages.PROVIDE_ALL_DATA)
	}

	const userFromDataBase = await UserModel.findOne({ email })

	if (!userFromDataBase) {
		res.status(400)
		throw new Error(ErrorMessages.USER_DOES_NOT_EXIST)
	}

	const isPasswordCorrect = await validatePassword(password, userFromDataBase.password)

	if (!isPasswordCorrect) {
		res.status(400)
		throw new Error(ErrorMessages.PASSWORD_INCORRECT)
	}

	const token = createToken({ id: userFromDataBase._id.toString() }, rememberMe ? '30d' : '1d')

	const userWithToken: UserWithToken = {
		user: serializeUser(userFromDataBase),
		token,
	}

	res.status(200).json({ result: userWithToken, message: SuccessMessages.LOGGED_IN } as ResponseModel<UserWithToken>)
})
