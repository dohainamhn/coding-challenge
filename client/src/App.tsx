import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import * as _ from 'lodash';
import { NewTaskPage } from './pages/newTasks';
import { ToDoListPage } from './pages/todoLists';
import { Toast } from './components/Toast';
import { AppContext } from './context';
import { INotification, Todo } from './interfaces';

function App() {
  const [toastList, setToastList] = useState<INotification[]>([]);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [checkedTasks, setCheckedTasks] = useState<string[]>([])

  const createNewNotification = useCallback(
    (payload: Omit<INotification, 'id'>) => {
      const newToast: INotification = {
        id: Math.random(),
        message: payload.message,
        description: payload.description,
        type: payload.type,
      };
      setToastList([...toastList, newToast]);
    },
    [toastList, setToastList]
  );

  return (
    <AppContext.Provider
      value={{
        createNotification: createNewNotification,
        todoList,
        setTodoList,
        toastList,
        setToastList,
        checkedTasks,
        setCheckedTasks
      }}
    >
      <Toast position='bottom-right'>
        <div className='home'>
          <div className='grid-item'>
            <NewTaskPage />
          </div>
            <ToDoListPage />
        </div>
      </Toast>
    </AppContext.Provider>
  );
}

export default App;
