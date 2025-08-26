/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
import { TaskRepository } from './tasks.repository';
@Injectable()
export class TasksService {
    constructor(private readonly tasksRepository: TaskRepository) {}

    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto, user);
    }

    getTaskById(id: string, user: User): Promise<Task> {
        return this.tasksRepository.getTaskById(id, user);
    }

    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto, user);
    }

    deleteTask(id: string, user: User): Promise<void> {
        return this.tasksRepository.deleteTask(id, user);
    }

    updateTaskStatus(
        id: string,
        status: TaskStatus,
        user: User,
    ): Promise<Task> {
        return this.tasksRepository.updateTaskStatus(id, status, user);
    }
}
