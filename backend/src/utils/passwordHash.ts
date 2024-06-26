import bcrypt from 'bcrypt'

export const hashingPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}
