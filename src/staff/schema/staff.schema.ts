/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Staff {
   @Prop()
   name: string;
   @Prop()
   staffNumber: number;
   @Prop()
   gender: string;
   @Prop()
   mobNum: number;
 
}
export const StaffSchema = SchemaFactory.createForClass(Staff);