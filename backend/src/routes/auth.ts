import express from 'express'
import { registration } from '../controllers/auth.js'
import { registerValidator } from '../validations/registerValidator.js'
export default (router: express.Router) => {
  router.post('/auth/register', registerValidator, registration)
}
