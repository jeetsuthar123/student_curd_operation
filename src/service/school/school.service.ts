/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSchoolDto } from 'src/dto/create-School.dto';
import { ISchool } from 'src/interface/School.interface';
import { Model } from 'mongoose';
import { UpdateSchoolDto } from 'src/dto/update-School.dto';

@Injectable()
export class SchoolService {
  constructor(@InjectModel('School') private schoolModel: Model<ISchool>) {}

  async createSchool(createSchoolDto: CreateSchoolDto): Promise<ISchool> {
    const newSchool = await new this.schoolModel(createSchoolDto);
    return newSchool.save();
  }

  async updateSchool(
    SchoolId: string,
    updateSchoolDto: UpdateSchoolDto,
  ): Promise<ISchool> {
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


  async getAllSchools(): Promise<ISchool[]> {
    const SchoolData = await this.schoolModel.find();
    if (!SchoolData || SchoolData.length == 0) {
      throw new NotFoundException('Schools data not found!');
    }
    return SchoolData;
  }


  async getSchool(SchoolId: string): Promise<ISchool> {
    const existingSchool = await this.schoolModel.findById(SchoolId).exec();
    if (!existingSchool) {
      throw new NotFoundException(`School #${SchoolId} not found`);
    }
    return existingSchool;
  }


  async deleteSchool(SchoolId: string): Promise<ISchool> {
    const deletedSchool = await this.schoolModel.findByIdAndDelete(SchoolId);
    if (!deletedSchool) {
      throw new NotFoundException(`School #${SchoolId} not found`);
    }
    return deletedSchool;
  }
}

