import express from 'express'
import { create, deletePost, getAll, getOne, patch } from '../controllers/post.js'
import { checkAuth, handleErrorsValidation } from '../middlewares/index.js'
import { postValidator } from '../validations/index.js'

export default (router: express.Router) => {
  router.get('/posts', getAll)
  router.post('/posts', checkAuth, postValidator, handleErrorsValidation, create)
  router.patch('/posts/:id', checkAuth, postValidator, handleErrorsValidation, patch)
  router.delete('/posts/:id', checkAuth, deletePost)
  router.get('/posts/:id', checkAuth, getOne)
}
