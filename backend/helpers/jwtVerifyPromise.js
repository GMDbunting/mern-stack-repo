import jwt from 'jsonwebtoken'

export const verifyToken = (token, secret=process.env.JWT_SECRET) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) throw new Error()
      else resolve(decoded)
    })
  })
}

export default { verifyToken };