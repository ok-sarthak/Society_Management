// server/models/User.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  flatNumber: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'resident'],
    default: 'resident'
  }
}, {
  timestamps: true
});

export default model('User', userSchema);