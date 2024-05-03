import { Request, Response } from 'express'
import UserModel from '../db/users.js'
import { hashingPassword } from '../utils/passwordHash.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { ModyfiedRequest } from '../middlewares/checkAuth.js'

export const registration = async (req: Request, res: Response) => {
  try {
    const password = req.body.password
    const hashedPassword = hashingPassword(password)

    const UserData = new UserModel({
      email: req.body.email,
      passwordHash: hashedPassword,
      avatar: req.body.avatar,
      fullname: req.body.fullname,
    })

    const user = await UserData.save()

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secretkey',
      {
        expiresIn: '30d',
      },
    )

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userInfo } = user._doc

    res.json({
      ...userInfo,
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Не удалось зарегестрировать пользователя',
    })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    })

    if (!user) {
      return res.status(404).json({
        message: 'Отсутствует пользователь в базе данных',
      })
    }

    const loginPasswordState = await bcrypt.compare(req.body.password, user._doc.passwordHash)

    if (!loginPasswordState) {
      return res.status(400).json({
        message: 'Неверный логин или пароль',
      })
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secretkey',
      { expiresIn: '30d' },
    )

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userData } = user._doc

    res.status(200).json({
      ...userData,
      token,
    })
  } catch (error) {
    console.log()
    res.status(500).json({
      message: 'Something went wrong',
    })
  }
}

export const getMe = async (req: ModyfiedRequest, res: Response) => {
  try {
    const me = await UserModel.findById(req.userId)
    if (!me) {
      return res.status(404).json({
        message: 'Не найден',
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userData } = me._doc
    res.status(200).json(userData)
  } catch (error) {
    res.status(500).json({
      message: 'Что-то пошло не так',
    })
  }
}
