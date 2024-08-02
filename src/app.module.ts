/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchoolModule } from './school.module';
import { StudentModule } from './student.module';
import { TeacherModule } from './teacher.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/student_database'),
    SchoolModule,
    StudentModule,
    TeacherModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
