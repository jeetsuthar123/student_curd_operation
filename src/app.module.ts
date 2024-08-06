/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student.module';
import { TeacherModule } from './teacher.module';
import { StaffModule } from './staff.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/student_database'),
    StaffModule,
    StudentModule,
    TeacherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
