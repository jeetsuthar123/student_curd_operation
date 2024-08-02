/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { CreateStudentDto } from "src/dto/create-student.dto";
import { CreateTeacherDto } from "src/dto/create-Teacher.dto";
@Schema()
export class School {
   @Prop()
   students: CreateStudentDto[];
   @Prop()
   teachers: CreateTeacherDto[];
}
export const SchoolSchema = SchemaFactory.createForClass(School);