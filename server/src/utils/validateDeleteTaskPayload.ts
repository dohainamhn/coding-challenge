import { todoModel } from '../model';
import { BadRequest } from './Errors/BadRequest';

export const validateDeleteTaskPayload = async (ids: string[]) => {
  const count = await todoModel.count({
    _id: {
      $in: ids,
    },
  });
  if (count !== ids.length) {
    throw new BadRequest('some task id does not exist');
  }
};
