import express from 'express'
import { getMe, login, registration } from '../controllers/auth.js'
import { registerValidator } from '../validations/registerValidator.js'
import { checkAuth } from '../middlewares/checkAuth.js'
export default (router: express.Router) => {
  router.post('/auth/register', registerValidator, registration)
  router.post('/auth/login', login)
  router.get('/auth/me', checkAuth, getMe)
}
