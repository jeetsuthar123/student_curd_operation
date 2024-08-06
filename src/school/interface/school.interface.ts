/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';
import { CreateTeacherDto } from 'src/teacher/dto/create-teacher.dto';

export interface ISchool extends Document{
    readonly  students: CreateStudentDto[];
    readonly teachers: CreateTeacherDto[];
}