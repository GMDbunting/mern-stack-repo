import mongoose from 'mongoose'
import User from './userModel.js'

const goalSchema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  text: {type: String, required: [true, 'Please add a text value']},
}, {timestamps: true, collection: "goals"}
)

export default mongoose.model('Goal', goalSchema)