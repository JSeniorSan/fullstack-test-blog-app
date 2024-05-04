import { body } from 'express-validator'

export default [
  body('email', 'Ошибка в email или password').isEmail(),
  body('password', 'Ошибка в email или password')
    .isLength({
      min: 5,
    })
    .isString(),
]
