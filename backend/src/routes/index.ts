import express from 'express'
import home from './home.js'
import auth from './auth.js'
const router = express.Router()

export default (): express.Router => {
  auth(router)
  home(router)
  return router
}
