/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Class {
   @Prop()
   name: string;
   @Prop()
   classStrength: number;
   @Prop()
   noOfBoys: number;
   @Prop()
   noOfGirls: number; 
}
export const ClassSchema = SchemaFactory.createForClass(Class);