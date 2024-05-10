import { Request, Response } from 'express'
import PostModel from '../db/posts.js'
import { ModyfiedRequest } from '../middlewares/checkAuth.js'

export const getAll = async (req: Request, res: Response) => {
  try {
    const allPosts = await PostModel.find()
      .populate({
        path: 'user',
        select: '-passwordHash',
      })
      .exec()

    if (!allPosts) {
      return res.status(400).json({
        message: 'Нет постов',
      })
    }
    res.status(200).json(allPosts)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Не удалось сделать запрос',
    })
  }
}

export const create = async (req: ModyfiedRequest, res: Response) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    })

    const post = await doc.save()
    return res.status(201).json(post)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Не удалось создать статью',
    })
  }
}

export const getOne = async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    const post = await PostModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $inc: { viewsCount: 1 },
      },
      { returnDocument: 'after' },
    )
      .populate('user')
      .exec()

    if (!post) {
      return res.status(404).json({
        message: 'Не был найден документ',
      })
    }

    return res.status(200).json(post)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Не удалось получить пост',
    })
  }
}

export const deletePost = async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    const deletedPost = await PostModel.findOneAndDelete({
      _id: id,
    })
    console.log(deletePost)

    if (!deletedPost) {
      return res.status(404).json({
        message: 'Не удалось найти пост',
      })
    }

    return res.status(200).json({
      success: true,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Ошибка на строне сервера',
    })
  }
}

export const patch = async (req: ModyfiedRequest, res: Response) => {
  try {
    const id = req.params.id

    await PostModel.updateOne(
      {
        _id: id,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      },
    )

    return res.status(200).json({
      success: true,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Не удалось обновить статью',
    })
  }
}
