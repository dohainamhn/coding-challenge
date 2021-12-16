import express from 'express';
import { deleteTasks } from '../controllers';
import todoRouters from './todoList';
const routers = express.Router();

routers.use('/todo', todoRouters);
routers.post('/todo[:]deleteTasks', deleteTasks);

export default routers;
