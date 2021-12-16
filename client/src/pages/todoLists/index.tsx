import React, { useContext, useEffect, useState } from 'react';
import { BulkActions } from '../../components/BulkActions';
import { Input } from '../../components/Input';
import { ToDoListItem } from '../../components/ToDoListItem';
import { AppContext, ContextType } from '../../context';
import { Todo } from '../../interfaces';
import {
  deleteOneTask,
  deleteTasks,
  getAllTask,
  updateTask,
} from '../../services';
import { handleDeleteItemsInArray } from '../../utils';
import { debounce } from '../../utils/debounce';
import './styles.scss';

export const ToDoListPage = () => {
  const {
    todoList,
    setTodoList,
    createNotification,
    checkedTasks,
    setCheckedTasks,
  } = useContext(AppContext) as ContextType;

  const getAllTodoList = async (search: string) => {
    try {
      const data = await getAllTask(search);
      setTodoList(data);
    } catch (error: any) {
      createNotification({
        message: 'Error',
        description: error.message,
        type: 'error',
      });
    }
  };

  const handleDeleteTodoItem = async (id: string) => {
    try {
      await deleteOneTask(id);
      const newTodoTask = todoList.filter((item) => {
        return item._id !== id;
      });
      setTodoList(newTodoTask);
      handleUncheckedTask(id);
      createNotification({
        message: 'Success',
        description: 'Delete task successfully',
        type: 'success',
      });
    } catch (error: any) {
      createNotification({
        message: 'Error',
        description: error.message,
        type: 'error',
      });
    }
  };
  const handleRemoveCheckedTodoTask = async () => {
    try {
      await deleteTasks(checkedTasks);
      setCheckedTasks([]);
      const newTasks = handleDeleteItemsInArray(checkedTasks, todoList);
      setTodoList(newTasks as Todo[]);
      createNotification({
        message: 'Success',
        description: 'Delete tasks successfully',
        type: 'success',
      });
    } catch (error: any) {
      createNotification({
        message: 'Error',
        description: error.message,
        type: 'error',
      });
    }
  };

  const handleSetCheckedTask = (id: string) => {
    setCheckedTasks([...checkedTasks, id]);
  };

  const handleUncheckedTask = (id: string) => {
    const newCheckedTask = checkedTasks.filter((item) => item !== id);
    setCheckedTasks(newCheckedTask);
  };

  const handleSubmit = async (payload: Todo) => {
    try {
      const updatedTask = await updateTask(payload);
      const newTodoList = todoList.map((item) => {
        if (item._id === updatedTask._id) {
          console.log('updatedTask', updatedTask);
          return updatedTask;
        }
        return item;
      });
      setTodoList(newTodoList);
      createNotification({
        message: 'Success',
        description: 'Update task successfully',
        type: 'success',
      });
    } catch (error: any) {
      createNotification({
        message: 'Error',
        description: error.message,
        type: 'error',
      });
    }
  };

  useEffect(() => {
    getAllTodoList('');
  }, []);

  const searchTask = async (e: any) => {
    await getAllTodoList(e.target.value);
  };

  const handleInputChange = debounce(searchTask, 500);
  console.log('handleInputChange',handleInputChange)
  return (
    <div className='grid-item'>
      <div
        className={`todo-list ${checkedTasks.length ? 'margin-bottom' : ''}`}
      >
        <div className='todo-list__title'>To Do List</div>
        <Input onChange={handleInputChange} placeholder='Search...' />
        {todoList.map((item) => {
          return (
            <ToDoListItem
              key={item._id}
              handleDeleteTodoItem={handleDeleteTodoItem}
              todo={item}
              setCheckedTask={handleSetCheckedTask}
              unCheckedTask={handleUncheckedTask}
              onUpdateTask={(payload) => {
                handleSubmit({
                  ...payload,
                  _id: item._id,
                });
              }}
            />
          );
        })}
      </div>
      {checkedTasks.length ? (
        <BulkActions onDeleteCheckedTask={handleRemoveCheckedTodoTask} />
      ) : (
        ''
      )}
    </div>
  );
};
