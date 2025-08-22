/* eslint-disable prettier/prettier */
import { TaskStatus } from './task-status.enum';
/* eslint-disable prettier/prettier */
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}


export { TaskStatus };

