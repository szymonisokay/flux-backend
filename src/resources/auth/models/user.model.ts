import { Schema, model } from 'mongoose'
import { User } from '../interfaces/user.interface'

const userSchema = new Schema<User>(
	{
		username: {
			type: String,
			required: true,
		},
		firstname: {
			type: String,
		},
		lastname: {
			type: String,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		avatar: {
			type: String,
		},
		password: {
			type: String,
			required: true,
		},
		roles: {
			type: [String],
		},
	},
	{ timestamps: true }
)

const UserModel = model<User>('User', userSchema)

export default UserModel
