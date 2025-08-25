/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

@Module({
    imports: [
        TasksModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL, 
            ssl: process.env.NODE_ENV === 'production', 
            autoLoadEntities: true,
            synchronize: true,
        }),
        AuthModule,
    ],
})
export class AppModule {}
