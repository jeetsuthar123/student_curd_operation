/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { IStudent } from "src/student/interface/student.interface";
import { ITeacher } from "src/teacher/interface/teacher.interface";

@Schema()
export class School {
   @Prop()
   students: IStudent[];
   @Prop()
   teachers: ITeacher[];
}
export const SchoolSchema = SchemaFactory.createForClass(School);