/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import {  ValidateNested } from "class-validator";
import { CreateStudentDto } from "src/student/dto/create-student.dto";
import { CreateTeacherDto } from "src/teacher/dto/create-teacher.dto";

export class CreateSchoolDto {
    @Type(() => CreateStudentDto)
    @ValidateNested({ each: true })
    readonly students: CreateStudentDto[];
   

    @Type(() => CreateTeacherDto)
    @ValidateNested({ each: true })
    readonly teachers: CreateTeacherDto[];
}