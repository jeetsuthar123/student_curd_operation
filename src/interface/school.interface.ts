/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
import { CreateStudentDto } from 'src/dto/create-student.dto';
import { CreateTeacherDto } from 'src/dto/create-Teacher.dto';
export interface ISchool extends Document{
    readonly  students: CreateStudentDto[];
    readonly teachers: CreateTeacherDto[];
}