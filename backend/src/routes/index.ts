import express from 'express'
import auth from './auth.js'
import post from './post.js'
import upload from './upload.js'
import tags from './tags.js'
const router = express.Router()

export default (): express.Router => {
  auth(router)
  post(router)
  upload(router)
  tags(router)
  return router
}
