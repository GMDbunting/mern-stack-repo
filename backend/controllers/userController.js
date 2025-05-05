import asyncHandler from 'express-async-handler'
import CustomError from '../customError/customError.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'

// Generate JSONwebToken
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET,{expiresIn: '10d'})
}

// Create a new sser
export const registerUser = asyncHandler( async (req, res, next) => {
  const {name, email, password} = req.body
  if (!name || !email || !password) {
    next(new CustomError('Please add all fields', 400))
  }
  const existingEmail = await User.findOne({"email": email})
  if (existingEmail) {
    next(new CustomError('a user with this email already exists'), 400)
  } else {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = await User.create({name, email, password: hashedPassword})
    delete newUser._doc.__v
    
    res.status(201).json(
      {...newUser._doc, ...{token: generateToken(newUser._doc._id)}}
    )
  }
})

// Login an existing user
export const loginUser = asyncHandler( async (req, res, next) => {
  const {email, password} = req.body
  if (!email || !password) {
    next(new CustomError('request must include an email and password', 400))
  } else {
    const userObject = await User.findOne({ "email": email })
    if (userObject && (await bcrypt.compare(password, userObject.password))) {
      delete userObject._doc.__v
      delete userObject._doc.updatedAt
      res.status(200).json(
        {...userObject._doc, ...{token: generateToken(userObject._doc._id)}}
      )
    } else next(new CustomError('incorrect email or password', 400))
  }
})

export const getMe = asyncHandler( async (req, res, next) => {
  res.status(200).json(req.user)
})

export default { registerUser, loginUser, getMe }