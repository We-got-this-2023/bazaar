import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'

const prisma = new PrismaClient()

dotenv.config()

const app = express()
const port = 3000

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

// TODO set up the user and products routes
app.use('/users', userRoutes)
app.use('/products', productRoutes)

app.listen(port, () => {
  console.log('Server running . . .')
})

export default prisma
