import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

dotenv.config()

const app = express()
const port = 3000

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.listen(port, () => {
  console.log('Server running . . .')
})

export default prisma
