/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

@Module({
    imports: [
        TasksModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL, // ← Use environment variable
            ssl: process.env.NODE_ENV === 'production', // Example: enable SSL only in production
            autoLoadEntities: true,
            synchronize: true, // ⚠️ Only use in development
        }),
    ],
})
export class AppModule {}
