import { Response, Request } from 'express'
import PostModel from '../db/posts.js'
export const getTags = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find().limit(5).exec()
    if (!posts) {
      res.status(404).json({
        message: 'Not found any post',
      })
    }
    const tags = posts.flatMap((post) => post.tags).slice(0, 6)
    res.status(200).json(tags)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Some error',
    })
  }
}
