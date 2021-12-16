import { Priority } from '../interfaces';
import { todoServices } from '../services/todo.services';
import { BadRequest } from '../utils/Errors/BadRequest';
import { validateDeleteTaskPayload } from '../utils/validateDeleteTaskPayload';
import { validateTodoPayload } from '../utils/validateTodoPayload';

export const createTodoTask = async (req: any, res: any) => {
  try {
    const { body } = req;
    validateTodoPayload(body);
    const createdTask = await todoServices.create({
      title: body.title,
      description: body.description,
      priority: Priority.High,
      dueDate: new Date(body.dueDate).toISOString(),
    });
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(error.code || 500).json(error.message);
  }
};

export const getAllTodoTask = async (req: any, res: any) => {
  try {
    const { search } = req.query;
    const data = await todoServices.findAll(search);
    res.status(200).json(data);
  } catch (error) {
    res.status(error.code || 500).json(error.message);
  }
};

export const deleteTodoTask = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const response = await todoServices.deleteOne(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(error.code || 500).json(error.message);
  }
};

export const deleteTasks = async (req: any, res: any) => {
  try {
    const { body } = req;
    await validateDeleteTaskPayload(body.ids);
    const response = await todoServices.deleteMany(body.ids);
    res.status(200).json(response);
  } catch (error) {
    res.status(error.code || 500).json(error.message);
  }
};

export const updateTask = async (req, res) => {
  try {
    const { body } = req;
    // check if task exists
    const task = await todoServices.findOne(body._id);
    if (!task) {
      throw new BadRequest(`Task with id ${body._id} does not exist`);
    }

    const payload = {
      ...task,
      ...body,
    };
    // validate payload
    validateTodoPayload(payload);
    // update
    const updatedTask = await todoServices.update(payload);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(error.code || 500).json(error.message);
  }
};
