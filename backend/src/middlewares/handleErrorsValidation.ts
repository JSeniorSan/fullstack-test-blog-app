import { Response, Request, NextFunction } from 'express'
import { validationResult } from 'express-validator'

export default (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json(errors.array())
  }
  next()
}