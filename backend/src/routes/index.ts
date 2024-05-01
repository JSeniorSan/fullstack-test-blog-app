import express from 'express'
import home from './home.js'
const router = express.Router()

export default (): express.Router => {
  home(router)
  return router
}
