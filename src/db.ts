import { connect } from 'mongoose'

export const connectToDb = () => {
	connect(process.env.MONGO_URI).then(() => console.log('Connected to DB'))
}
