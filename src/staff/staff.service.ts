/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffDocument } from './schema/staff.schema';

@Injectable()
export class StaffService {

  constructor(@InjectModel('Staff') private staffModel:Model<StaffDocument>) { }
async createStaff(createStaffDto: CreateStaffDto): Promise<StaffDocument> {
   const newStaff = await new this.staffModel(createStaffDto);
   return newStaff.save();
}
async updateStaff(StaffId: string, updateStaffDto: UpdateStaffDto): Promise<StaffDocument> {
    const existingStaff = await        this.staffModel.findByIdAndUpdate(StaffId, updateStaffDto, { new: true });
   if (!existingStaff) {
     throw new NotFoundException(`Staff #${StaffId} not found`);
   }
   return existingStaff;
}
async getAllStaffs(): Promise<StaffDocument[]> {
    const StaffData = await this.staffModel.find();
    if (!StaffData || StaffData.length == 0) {
        throw new NotFoundException('Staffs data not found!');
    }
    return StaffData;
}
async getStaff(StaffId: string): Promise<StaffDocument> {
   const existingStaff = await     this.staffModel.findById(StaffId).exec();
   if (!existingStaff) {
    throw new NotFoundException(`Staff #${StaffId} not found`);
   }
   return existingStaff;
}
async deleteStaff(StaffId: string): Promise<StaffDocument> {
    const deletedStaff = await this.staffModel.findByIdAndDelete(StaffId);
   if (!deletedStaff) {
     throw new NotFoundException(`Staff #${StaffId} not found`);
   }
   return deletedStaff;
}
}
