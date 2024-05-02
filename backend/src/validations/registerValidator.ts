import { body } from 'express-validator'

export const registerValidator = [
  body('email', 'Неверный формат email').isEmail(),
  body('password', 'Формат пароля неверен').isLength({ min: 5 }),
  body('fullname', 'Имя не соответствует условию').isLength({ min: 3 }),
  body('avatarUrl', 'Неверный адресс URL').optional().isURL(),
]
