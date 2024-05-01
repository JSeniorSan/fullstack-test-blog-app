import mongoose from 'mongoose'

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

export default mongoose.model('User', UserSchema)
