import mongoose from 'mongoose';
import { Priority } from '../interfaces/TodoList';

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    dueDate: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      enum: [Priority.High,Priority.Low,Priority.Normal],
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

export const todoModel = mongoose.model('Todo', TodoSchema);
