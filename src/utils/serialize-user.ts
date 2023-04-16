import { HydratedDocument } from 'mongoose'
import { SerializedUser, User } from '../resources/auth/interfaces/user.interface'

export const serializeUser = (user: HydratedDocument<User>): SerializedUser => {
	const { password, _id, ...userData } = user.toObject()

	return { ...userData, id: _id.toString() }
}
