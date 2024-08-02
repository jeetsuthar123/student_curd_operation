/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeacherSchema } from './schema/teacher.schema';
import { TeacherController } from './controller/teacher/teacher.controller';
import { TeacherService } from './service/teacher/teacher.service';


@Module({
  imports: [
   
    MongooseModule.forFeature([{ name: 'Teacher', schema: TeacherSchema }]),
  
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
