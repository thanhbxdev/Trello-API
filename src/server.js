import express from 'express'
import { connectDB } from './config/mongodb'
import { env } from './config/environtment'

const app = express()


connectDB().catch(console.log)

app.get('/', (req, res) => {
  res.end('<h1>Hello World</h1>')
})

app.listen( env.PORT, env.HOST, () => {
  console.log(`hello thanhbxdev,Im running at ${env.HOST}:${env.PORT}`)
})