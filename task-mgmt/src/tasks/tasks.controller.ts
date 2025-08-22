/* eslint-disable prettier/prettier */
import { Body, Controller,Delete,Get,Param,Patch,Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import * as taskModel from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto) : taskModel.Task[]{
    if(Object.keys(filterDto).length){
        return this.tasksService.getTasksWithFilters(filterDto)
    } else{
        return this.tasksService.getAllTasks();
    }
   }

  @Get('/:id')
  getTaskById(@Param('id') id:string): taskModel.Task{
    return this.tasksService.getTaskById(id)
  } 

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto
    ) :taskModel.Task{
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete("/:id")
  deleteTask(@Param('id') id:string) : void{
    this.tasksService.deleteTask(id);
    // console.log()
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id:string,
    @Body('status') status: taskModel.TaskStatus,
  ): taskModel.Task {
    return this.tasksService.updateTaskStatus(id,status);
  }
}
