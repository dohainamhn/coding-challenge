import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Priority, Todo } from '../../interfaces/Todo';
import { TodoPayloadErrors } from '../../interfaces/TodoPayloadErrors';
import { validateTodoPayload } from '../../utils/validateTodoPayload';
import { DatePicker } from '../DatePicker';
import { Input } from '../Input';
import { SingleSelect } from '../SingleSelect';
import './styles.scss';

interface Props {
  onTaskSubmit: (payload: any) => void;
  initValues: Todo;
  isUpdateMode?: boolean;
}

export const Task = (props: Props) => {
  const { onTaskSubmit, initValues, isUpdateMode = false } = props;
  const [formData, updateFormData] = useState<Todo>(initValues);

  const [errors, setErrors] = useState<TodoPayloadErrors>({
    titleError: false,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { hasError } = validateTodoPayload(formData);
    if (!hasError) {
      onTaskSubmit(formData);
    }
  };

  useEffect(() => {
    const { errors } = validateTodoPayload(formData);
    setErrors(errors);
  }, [formData]);

  const handleChange = (event: ChangeEvent<any>) => {
    const newPayload = {
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value,
    };
    updateFormData(newPayload);
  };

  return (
    <div className='task'>
      <form onSubmit={handleSubmit}>
        <div className='task-title'>
          <Input
            value={formData.title}
            name='title'
            placeholder='Add new task'
            error={errors.titleError}
            onChange={handleChange}
          />
        </div>
        <div className='task-description'>
          <h4 className='task-description__title'>Description</h4>
          <textarea
            value={formData.description}
            onChange={handleChange}
            name='description'
            className='task-description__content'
          />
        </div>
        <div className='task-bottom'>
          <DatePicker
            initData={formData.dueDate}
            name='dueDate'
            onChange={handleChange}
            label='Due Date'
          />
          <SingleSelect
            onChange={handleChange}
            value={formData.priority}
            options={[Priority.High, Priority.Low, Priority.Normal]}
            label='Priority'
          />
        </div>
        <button type='submit' className='submit-btn'>
          {isUpdateMode ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  );
};
