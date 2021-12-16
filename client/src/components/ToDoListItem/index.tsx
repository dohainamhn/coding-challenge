import React, { useRef, useState } from 'react';
import { Todo } from '../../interfaces';
import { Task } from '../Task';
import './styles.scss';

interface Props {
  todo: Todo;
  handleDeleteTodoItem: (id: string) => Promise<void>;
  setCheckedTask: (id: string) => void;
  unCheckedTask: (id: string) => void;
  onUpdateTask: (Task: Todo) => void;
}

export const ToDoListItem = (props: Props) => {
  const {
    todo,
    handleDeleteTodoItem,
    setCheckedTask,
    unCheckedTask,
    onUpdateTask,
  } = props;
  const [checked, setChecked] = useState<Boolean>(false);
  const [currentTaskId, setCurrentTaskId] = useState<string>('');

  const uncheckedIconUrl = '/static/images/unchecked.png';
  const checkedIconUrl = '/static/images/checked.png';

  const handleCheckBoxClick = (): void => {
    if (checked) {
      unCheckedTask(todo._id);
    } else {
      setCheckedTask(todo._id);
    }
    setChecked(!checked);
  };

  const handleShowOrHiddenTask = (id: string) => {
    setCurrentTaskId(id);
  };

  return (
    <div className='todo-list-item'>
      <div
        className={`header ${
          todo._id !== currentTaskId ? 'border-bottom-unset' : ''
        }`}
      >
        <div className='header__left'>
          <div className='check-box'>
            <label
              onClick={handleCheckBoxClick}
              id='checkbox'
              className='checkbox-custom-label'
            >
              <img src={checked ? checkedIconUrl : uncheckedIconUrl} />
            </label>
          </div>
          <div className='title'>{todo.title}</div>
        </div>
        <div className='header__right'>
          <button
            onClick={() => {
              if (todo._id === currentTaskId) {
                handleShowOrHiddenTask('');
              } else {
                handleShowOrHiddenTask(todo._id);
              }
            }}
            className='detail-btn'
          >
            Detail
          </button>
          <button
            onClick={() => {
              handleDeleteTodoItem(todo._id);
            }}
            className='remove-btn'
          >
            Remove
          </button>
        </div>
      </div>
      {todo._id === currentTaskId && (
        <div className='content'>
          <Task
            initValues={
              {
                title: todo.title,
                description: todo.description,
                dueDate: new Date(todo.dueDate).toISOString(),
                priority: todo.priority,
              } as Todo
            }
            isUpdateMode={true}
            onTaskSubmit={onUpdateTask}
          />
        </div>
      )}
    </div>
  );
};
