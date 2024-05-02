import mongoose from 'mongoose'

export interface UserI {
  email: string
  passwordHash: string
  fullname: string
  avatar?: string
}

export interface UserDoc extends mongoose.Document {
  _doc: UserI
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      require: true,
    },
    fullname: {
      type: String,
      require: true,
    },
    avatar: String,
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<UserDoc>('User', UserSchema)
