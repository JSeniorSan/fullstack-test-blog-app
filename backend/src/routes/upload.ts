import express from 'express'
import { upload } from '../utils/multer.js'
import { uploadImage } from '../controllers/upload.js'
import checkAuth from '../middlewares/checkAuth.js'

export default (router: express.Router) => {
  router.post('/upload', checkAuth, upload.single('image'), uploadImage)
}
