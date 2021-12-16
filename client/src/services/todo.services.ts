import { overrideConfigs } from '../environment/overrideConfigs';
import { Todo } from '../interfaces';

const ConvertPayloadToFetchBody = (method: string, payload?: any) => {
  if (payload) {
    return {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
  }
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

const catchError = async (response: Response) => {
  const data = JSON.parse(await response.text());
  if (!response.ok) {
    throw new Error(data);
  }
  return data;
};

export const createNewTask = async (payload: Todo) => {
  const data = await fetch(
    `${overrideConfigs.serverUrl}/todo`,
    ConvertPayloadToFetchBody('POST',payload)
  );
  return catchError(data);
};

export const getAllTask = async (search: string)=>{
  const data = await fetch(
    `${overrideConfigs.serverUrl}/todo?search=${search}`,
    ConvertPayloadToFetchBody('GET')
  );
  return catchError(data);
}

export const deleteOneTask = async (id: string)=>{
  const data = await fetch(
    `${overrideConfigs.serverUrl}/todo/${id}`,
    ConvertPayloadToFetchBody('DELETE')
  );
  return catchError(data);
}
export const deleteTasks = async (ids: string[])=>{
  const data = await fetch(
    `${overrideConfigs.serverUrl}/todo:deleteTasks`,
    ConvertPayloadToFetchBody('POST',{
      ids,
    })
  );
  return catchError(data);
}

export const updateTask = async (payload: Todo): Promise<Todo> => {
  const data = await fetch(
    `${overrideConfigs.serverUrl}/todo`,
    ConvertPayloadToFetchBody('PATCH',payload)
  );
  return catchError(data);
};
