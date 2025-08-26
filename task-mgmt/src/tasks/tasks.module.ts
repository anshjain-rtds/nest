import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Task } from './task.entity';
import { TaskRepository } from './tasks.repository';

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([Task]), AuthModule],
    controllers: [TasksController],
    providers: [TasksService, TaskRepository],
    exports: [TasksService],
})
export class TasksModule {}
