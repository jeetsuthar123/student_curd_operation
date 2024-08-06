/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStaffDto } from 'src/dto/create-Staff.dto';
import { Model } from "mongoose";
import { UpdateStaffDto } from 'src/dto/update-Staff.dto';
import { IStaff } from 'src/interface/staff.interface';


@Injectable()
export class StaffService {
constructor(@InjectModel('Staff') private staffModel:Model<IStaff>) { }
async createStaff(createStaffDto: CreateStaffDto): Promise<IStaff> {
   const newStaff = await new this.staffModel(createStaffDto);
   return newStaff.save();
}
async updateStaff(StaffId: string, updateStaffDto: UpdateStaffDto): Promise<IStaff> {
    const existingStaff = await        this.staffModel.findByIdAndUpdate(StaffId, updateStaffDto, { new: true });
   if (!existingStaff) {
     throw new NotFoundException(`Staff #${StaffId} not found`);
   }
   return existingStaff;
}
async getAllStaffs(): Promise<IStaff[]> {
    const StaffData = await this.staffModel.find();
    if (!StaffData || StaffData.length == 0) {
        throw new NotFoundException('Staffs data not found!');
    }
    return StaffData;
}
async getStaff(StaffId: string): Promise<IStaff> {
   const existingStaff = await     this.staffModel.findById(StaffId).exec();
   if (!existingStaff) {
    throw new NotFoundException(`Staff #${StaffId} not found`);
   }
   return existingStaff;
}
async deleteStaff(StaffId: string): Promise<IStaff> {
    const deletedStaff = await this.staffModel.findByIdAndDelete(StaffId);
   if (!deletedStaff) {
     throw new NotFoundException(`Staff #${StaffId} not found`);
   }
   return deletedStaff;
}
}



