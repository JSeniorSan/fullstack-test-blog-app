import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './routes/index.js'

config()
const PORT = process.env.PORT || 5000
const MONGO_URL = process.env.MONGO_URL || ''

const app = express()

app.use(
  cors({
    credentials: true,
  }),
)
app.use('/uploads', express.static('src/uploads'))
app.use(cookieParser())
app.use(bodyParser.json())

mongoose
  .connect(MONGO_URL)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} successful`)
})

app.use('/', router())
