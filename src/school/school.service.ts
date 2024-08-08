/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { SchoolDocument } from './schema/school.schema';

@Injectable()
export class SchoolService {

  constructor(@InjectModel('School') private schoolModel: Model<SchoolDocument>) {}

  async createSchool(createSchoolDto: CreateSchoolDto): Promise<SchoolDocument> {
    const newSchool = await new this.schoolModel(createSchoolDto);
    return newSchool.save();
  }

  async updateSchool(
    SchoolId: string,
    updateSchoolDto: UpdateSchoolDto,
  ): Promise<SchoolDocument> {
    const existingSchool = await this.schoolModel.findByIdAndUpdate(
      SchoolId,
      updateSchoolDto,
      { new: true },
    );
    if (!existingSchool) {
      throw new NotFoundException(`School #${SchoolId} not found`);
    }
    return existingSchool;
  }


  async getAllSchools(): Promise<SchoolDocument[]> {
    const SchoolData = await this.schoolModel.find();
    if (!SchoolData || SchoolData.length == 0) {
      throw new NotFoundException('Schools data not found!');
    }
    return SchoolData;
  }


  async getSchool(SchoolId: string): Promise<SchoolDocument> {
    const existingSchool = await this.schoolModel.findById(SchoolId).exec();
    if (!existingSchool) {
      throw new NotFoundException(`School #${SchoolId} not found`);
    }
    return existingSchool;
  }


  async deleteSchool(SchoolId: string): Promise<SchoolDocument> {
    const deletedSchool = await this.schoolModel.findByIdAndDelete(SchoolId);
    if (!deletedSchool) {
      throw new NotFoundException(`School #${SchoolId} not found`);
    }
    return deletedSchool;
  }
}
