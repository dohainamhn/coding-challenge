import express from 'express';
import {
  createTodoTask,
  deleteTodoTask,
  getAllTodoTask,
  updateTask,
} from '../../controllers';

const todoRouters = express.Router();

todoRouters.post('/', createTodoTask);
todoRouters.get('/', getAllTodoTask);
todoRouters.delete('/:id', deleteTodoTask);
todoRouters.patch('/', updateTask);

export default todoRouters;
