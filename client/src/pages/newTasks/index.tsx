import React, { useContext, useState } from 'react';
import { Task } from '../../components/Task';
import { AppContext, ContextType } from '../../context';
import { Priority, Todo } from '../../interfaces/Todo';
import { createNewTask } from '../../services';

import './styles.scss';

export const NewTaskPage = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { createNotification, todoList, setTodoList } = useContext(
    AppContext
  ) as ContextType;

  const handleCreateNewTask = async (payload: Todo) => {
    try {
      setLoading(true);
      const data = await createNewTask(payload);
      createNotification({
        message: 'Success',
        description: 'Create new task successfully',
        type: 'success',
      });
      setTodoList([...todoList, data]);
    } catch (error: any) {
      createNotification({
        message: 'Error',
        description: error.message,
        type: 'error',
      });
    }
    setLoading(false);
  };

  return (
    <div className='new-task'>
      <div className='new-task__title'>New Task</div>
      <Task
        initValues={
          {
            title: '',
            description: '',
            dueDate: new Date().toISOString(),
            priority: Priority.Normal,
          } as Todo
        }
        isUpdateMode={false}
        onTaskSubmit={(payload) => {
          handleCreateNewTask(payload);
        }}
      />
    </div>
  );
};
