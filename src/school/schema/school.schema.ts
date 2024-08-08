/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose";
import { StudentDocument } from "src/student/schema/student.schema";
import { TeacherDocument } from "src/teacher/schema/teacher.schema";

export type SchoolDocument = HydratedDocument<School>;
@Schema()
export class School {
   @Prop()
   students: StudentDocument[];
   @Prop()
   teachers: TeacherDocument[];
}
export const SchoolSchema = SchemaFactory.createForClass(School);