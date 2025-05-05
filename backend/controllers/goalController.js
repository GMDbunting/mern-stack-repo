import asyncHandler from 'express-async-handler'
import Goal from '../models/goalModel.js'
import CustomError from '../customError/customError.js'


export const getGoals = asyncHandler(async (req, res, next) => { 
  if (req.query.showUser) {
    let goal = await Goal.find({user: req.user.id})
    .populate({path: 'user', select: '-password -__v'})
    .select('-__v -createdAt -updatedAt')

    res.status(200).json(goal)
  } else {
    const goal = await Goal.find({user: req.user.id})
    .select('-__v -createdAt -updatedAt')

    res.status(200).json(goal)
  }
})

export const setGoal = asyncHandler(async (req, res, next) => {
  if (typeof req.body === 'object' && typeof req.body.text === 'string') {
    const goal = await Goal.create({user: req.user.id, text: req.body.text})
    res.status(201).json(goal)
  } else {
    next(new CustomError('Invalid request', 400) )
  }
})

export const updateGoal = asyncHandler(async (req, res, next) => {
  const goalId = await Goal.find({_id: req.params.id, user: req.user.id})
  if (goalId.length > 0) {
    const updated = await Goal.findByIdAndUpdate(
      req.params.id, {user: req.user.id, text: req.body.text}, {new: false}
    )
    res.status(202).json(updated)
  } else {
    next(new CustomError('no document matches the requested id', 404))
  } 
})

export const deleteGoal = asyncHandler(async (req, res, next) => {
  const goalId = await Goal.find({_id: req.params.id, user: req.user.id})
  if (goalId.length > 0) {
    let deleted = await Goal.findOneAndDelete({_id: req.params.id})
    res.status(204).json(deleted)
  } else next(new CustomError('no document matches the requested id', 404))
})

export default { getGoals, setGoal, updateGoal, deleteGoal }