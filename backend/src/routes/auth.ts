import { Router } from 'express'
import { getMe, login, registration } from '../controllers/auth.js'
import { registerValidator, loginValidator } from '../validations/index.js'
import { checkAuth, handleErrorsValidation } from '../middlewares/index.js'

export default (router: Router) => {
  router.post('/auth/register', registerValidator, handleErrorsValidation, registration)
  router.post('/auth/login', loginValidator, handleErrorsValidation, login)
  router.get('/auth/me', checkAuth, getMe)
}
