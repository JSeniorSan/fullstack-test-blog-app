import express from 'express'
import auth from './auth.js'
import post from './post.js'
const router = express.Router()

export default (): express.Router => {
  auth(router)
  post(router)
  return router
}
