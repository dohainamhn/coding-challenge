import { Priority, TodoList } from '../interfaces';
import { BadRequest } from './Errors/BadRequest';

const PriorityType = [Priority.High, Priority.Low, Priority.Normal];

export const validateTodoPayload = (payload: TodoList) => {
  if (!payload.title || payload.title.trim() === '') {
    throw new BadRequest('Title is required');
  } else if (!payload.dueDate || !dueDateTimeIsNotThePast(payload.dueDate)) {
    throw new BadRequest('Due date time is not valid');
  } else if (!payload.priority || !PriorityType.includes(payload.priority)) {
    throw new BadRequest('Priority is not valid');
  }
};

const dueDateTimeIsNotThePast = (dueDate: string) => {
  const now = new Date();
  const dueDateTime = new Date(dueDate);
  dueDateTime.setUTCHours(0, 0, 0, 0);
  now.setUTCHours(0, 0, 0, 0);
  return dueDateTime >= now;
};
