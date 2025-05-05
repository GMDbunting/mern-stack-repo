import express from 'express'
const router = express.Router()
import CustomError from '../customError/customError.js'
import { getGoals, setGoal, updateGoal, deleteGoal } from '../controllers/goalController.js'
import { protect } from '../middleware/authMiddleware.js'

router.get('/', protect, getGoals)

router.post('/', protect, setGoal)

router.put('/:id', protect, updateGoal)

router.delete('/:id', protect, deleteGoal)

export default router;