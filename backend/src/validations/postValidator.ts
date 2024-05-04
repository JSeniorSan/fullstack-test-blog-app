import { body } from 'express-validator'

export default [
  body('title', 'Отсутствует title').isString().isLength({ min: 3 }),
  body('text', 'Нет передаваемого текста').isString().isLength({ min: 5 }),
  body('imageUrl', 'Данных о картинке нет').optional().isString(),
  body('tags', 'Теги отсутствуют').optional().isArray(),
]
