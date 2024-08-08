/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Document {
   @Prop()
   name: string;

   @Prop({  unique:[true,'Duplicate email entered']})
   email: string;

   @Prop()
   password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);