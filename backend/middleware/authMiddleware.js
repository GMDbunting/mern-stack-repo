import { verifyToken } from '../helpers/jwtVerifyPromise.js'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import CustomError from '../customError/customError.js'

export const protect = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    let token = req.headers.authorization.split(' ')[1]
    try {
      // This throws an Error if the token is not verified so the catch catches it
      const decodeUserToken = await verifyToken(token)

      let userDetails = await User.findById(decodeUserToken.id)
      .select('-password -__v')
      if (!userDetails) next(new CustomError('User does not exist', 401))
      
      // setting req.user so we can use it in the next middleware
      req.user = userDetails
      next()
    } catch (error) {
      next(new CustomError('Not authorized', 401))
    } 
  } else next(new CustomError('Not authorized, no token', 401))
})

export default { protect }