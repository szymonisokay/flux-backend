export {}

declare global {
	namespace Express {
		export interface Request {
			authId?: string
		}
	}
}
