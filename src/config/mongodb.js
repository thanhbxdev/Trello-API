import { MongoClient } from 'mongodb'
import { env } from './environtment'

let dbInstance = null

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useUnifiedTopology:true,
    useNewUrlParser: true
  })
  await client.connect()

  dbInstance = client.db(env.DATABASE_NAME)

  // Assign client DB to our dbInstance
}
// Get Database Instance
export const getDB=() => {
  if (!dbInstance) throw new Error('Must connect to Database first!')
  return dbInstance
}