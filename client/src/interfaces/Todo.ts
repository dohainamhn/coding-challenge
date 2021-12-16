export interface Todo {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
}

export enum Priority {
  High = 'high',
  Normal = 'normal',
  Low = 'low',
}
