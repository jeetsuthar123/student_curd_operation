/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose";
import { User } from "src/auth/schema/user.schema";
@Schema()
export class Student {
   @Prop()
   name: string;

   @Prop()
   roleNumber: number;

   @Prop()
   class: number;

   @Prop()
   gender: string;

   @Prop()
   marks: number;

   @Prop({type : mongoose.Schema.Types.ObjectId, ref: 'User'})
   user: User;

}
export const StudentSchema = SchemaFactory.createForClass(Student);