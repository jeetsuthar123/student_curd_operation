/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { CreateStudentDto } from "./create-student.dto";
import { CreateTeacherDto } from "./create-Teacher.dto";
export class CreateSchoolDto {
    @IsNotEmpty()
    readonly students: CreateStudentDto[];
    @IsNotEmpty()
    readonly teachers: CreateTeacherDto[];
}