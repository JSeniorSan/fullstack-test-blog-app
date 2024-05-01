import { validationResult } from 'express-validator'
import express from 'express'
import UserModel from '../db/users.js'
import { hashingPassword } from '../utils/passwordHash.js'
import jwt from 'jsonwebtoken'

export const registration = async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }
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
        expiresIn: '15m',
      },
    )

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userInfo } = user

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
