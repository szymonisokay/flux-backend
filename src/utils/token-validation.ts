import { sign, verify, JwtPayload } from 'jsonwebtoken'

export const createToken = (payload: { [key: string]: string }, expiresIn: string = '1d'): string => {
	return sign(payload, process.env.SECRET_KEY, { expiresIn })
}

export const verifyToken = (token: string): string | JwtPayload => {
	return verify(token, process.env.SECRET_KEY)
}
