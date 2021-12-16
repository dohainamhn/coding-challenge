import { Todo } from "../interfaces";

export const handleDeleteItemsInArray = (
  deletedIds: string[],
  data: Pick<Todo,'_id'>[]
) => {
  return data.filter((item) => !deletedIds.includes(item._id));
};
