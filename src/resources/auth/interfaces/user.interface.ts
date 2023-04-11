export interface User {
	username: string
	firstname?: string
	lastname?: string
	email: string
	avatar?: string
	password: string
	roles: string[]
}

export interface UserWithToken {
	user: User
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
