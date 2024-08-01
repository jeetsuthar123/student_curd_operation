/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentController } from './controller/student/student.controller';
import { StudentSchema } from './schema/student.schema';
import { StudentService } from './service/student/student.service';
import { TeacherSchema } from './schema/teacher.schema';
import { TeacherController } from './controller/teacher/teacher.controller';
import { TeacherService } from './service/teacher/teacher.service';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/student_database'),
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
    MongooseModule.forFeature([{ name: 'Teacher', schema: TeacherSchema }]),
  ],
  controllers: [AppController, StudentController, TeacherController],
  providers: [AppService, StudentService, TeacherService],
})
export class AppModule {}
