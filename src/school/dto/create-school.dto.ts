/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { CreateStudentDto } from "src/student/dto/create-student.dto";
import { CreateTeacherDto } from "src/teacher/dto/create-teacher.dto";

export class CreateSchoolDto {
    @IsNotEmpty()
    readonly students: CreateStudentDto[];
    @IsNotEmpty()
    readonly teachers: CreateTeacherDto[];
}