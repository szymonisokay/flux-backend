export {}

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			MONGO_URI: string
			PORT: number
			SECRET_KEY: string
		}
	}
}
