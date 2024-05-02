import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export interface ModyfiedRequest extends Request {
  userId?: string
}

export const checkAuth = async (req: ModyfiedRequest, res: Response, next: NextFunction) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

  if (token) {
    try {
      const decoded = jwt.verify(token, 'secretkey')
      if (typeof decoded === 'object' && '_id' in decoded) {
        req.userId = decoded._id
        next()
      }
    } catch (error) {
      return res.status(403).json({
        message: 'Отказано в доступе',
      })
    }
  } else {
    res.status(403).json({
      message: 'Нет доступа',
    })
  }
}
