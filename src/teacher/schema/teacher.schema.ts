/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose";

export type TeacherDocument = HydratedDocument<Teacher>;

@Schema()
export class Teacher {
   @Prop()
   name: string;
   @Prop()
   mobileNumber: number;
   @Prop()
   classes: number[];
   @Prop()
   gender: string;
}
export const TeacherSchema = SchemaFactory.createForClass(Teacher);