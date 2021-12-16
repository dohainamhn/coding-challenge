import { Todo } from '../interfaces/Todo';
import { TodoPayloadErrors } from '../interfaces/TodoPayloadErrors';

export const validateTodoPayload = (payload: Todo) => {
  let hasError = false;
  const errors: TodoPayloadErrors = {
    titleError: false,
  };
  if (payload.title.trim() === '') {
    errors.titleError = true;
    hasError = true;
  }
  return {
    errors,
    hasError,
  };
};
