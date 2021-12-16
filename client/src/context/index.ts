import React from 'react';
import { INotification, Todo } from '../interfaces';

export interface ContextType {
  createNotification: (payload: Omit<INotification, 'id'>) => void;
  todoList: Todo[];
  setTodoList: (list: Todo[]) => void;
  toastList: INotification[];
  setToastList: (list: INotification[]) => void;
  checkedTasks: string[];
  setCheckedTasks: (taskIds: string[]) => void;
}

export const AppContext = React.createContext({});
