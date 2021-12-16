import { DeepPartial } from 'mongoose';
import { TodoList } from '.';

interface DeleteResult {
  deletedCount: number;
}

export interface TodoServices {
  create: (payload: TodoList) => Promise<TodoList>;
  update: (payload: DeepPartial<TodoList>) => Promise<TodoList>;
  findOne: (id: string) => Promise<TodoList>;
  findAll: (searchString: string) => Promise<TodoList[]>;
  deleteOne: (id: string) => Promise<DeleteResult>;
  deleteMany: (id: string[]) => Promise<DeleteResult>;
}
