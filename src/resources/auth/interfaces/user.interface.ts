export interface User {
	id?: string
	username: string
	firstname?: string
	lastname?: string
	email: string
	avatar?: string
	password: string
	roles: string[]
}

export interface SerializedUser extends Omit<User, 'password'> {}

export interface UserWithToken {
	user: SerializedUser
	token: string
}

export interface registerModel {
	username: string
	email: string
	password: string
}

export interface loginModel {
	email: string
	password: string
	rememberMe?: boolean
}
