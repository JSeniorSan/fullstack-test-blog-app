import mongoose from 'mongoose'
import { UserDoc } from './users.js'

export interface PostI {
  title: string
  text: string
  imageUrl: string
  tags: string[]
  viewsCount: number
  user: UserDoc
}

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
      unique: true,
    },
    imageUrl: String,
    tags: {
      type: Array,
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<PostI>('Post', postSchema)
