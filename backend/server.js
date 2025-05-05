import dotenv from 'dotenv'; dotenv.config()
import express from 'express'
import goalRoutes from './routes/goalRoutes.js'
import errorHandler from './middleware/error.js'
import logger from './middleware/logger.js'
import CustomError from './customError/customError.js'
import colors from 'colors'
import { connectDB } from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'

connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({origin: 'http://localhost:5173'}))

app.use(logger)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', goalRoutes)
app.use('/api/users', userRoutes)

app.use((req, res, next) => {
  next(new CustomError('the requested resource was not found', 404))
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`server running on port ${PORT}...`))