export type NotificationType = 'success' | 'error' | 'warning';
export interface INotification {
  id: number;
  message: string;
  description: string;
  type: NotificationType;
}
