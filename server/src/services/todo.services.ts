import { TodoServices } from '../interfaces';
import { todoModel } from '../model';

export const todoServices: TodoServices = {
  create: async (payload) => {
    return await todoModel.create(payload);
  },
  update: async (payload) => {
    return await todoModel
      .findOneAndUpdate(
        {
          _id: payload._id,
        },
        {
          $set: payload,
        },
        {
          new: true,
        }
      )
      .lean();
  },
  findAll: async (searchString) => {
    return await todoModel
      .find({
        title: {
          $regex: searchString,
        },
      })
      .lean();
  },
  findOne: async (id: string) => {
    return await todoModel
      .findOne({
        _id: id,
      })
      .lean();
  },
  deleteOne: async (id: string) => {
    return await todoModel.deleteOne({
      _id: id,
    });
  },
  deleteMany: async (ids: string[]) => {
    return await todoModel.deleteMany({
      _id: {
        $in: ids,
      },
    });
  },
};
