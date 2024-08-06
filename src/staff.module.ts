/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StaffSchema } from './schema/staff.schema';
import { StaffController } from './controller/staff/staff.controller';
import { StaffService } from './service/staff/staff.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Staff', schema: StaffSchema }]),
  ],
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule {}
