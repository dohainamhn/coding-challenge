export interface TodoList {
  _id?: string,
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
}

export enum Priority {
  High = 'high',
  Low = 'low',
  Normal = 'normal',
}
