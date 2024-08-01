/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTeacherDto } from 'src/dto/create-Teacher.dto';
import { ITeacher } from 'src/interface/Teacher.interface';
import { Model } from 'mongoose';
import { UpdateTeacherDto } from 'src/dto/update-Teacher.dto';

@Injectable()
export class TeacherService {
  constructor(@InjectModel('Teacher') private teacherModel: Model<ITeacher>) {}

  async createTeacher(createTeacherDto: CreateTeacherDto): Promise<ITeacher> {
    const newTeacher = await new this.teacherModel(createTeacherDto);
    return newTeacher.save();
  }

  async updateTeacher(
    TeacherId: string,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<ITeacher> {
    const existingTeacher = await this.teacherModel.findByIdAndUpdate(
      TeacherId,
      updateTeacherDto,
      { new: true },
    );
    if (!existingTeacher) {
      throw new NotFoundException(`Teacher #${TeacherId} not found`);
    }
    return existingTeacher;
  }


  async getAllTeachers(): Promise<ITeacher[]> {
    const TeacherData = await this.teacherModel.find();
    if (!TeacherData || TeacherData.length == 0) {
      throw new NotFoundException('Teachers data not found!');
    }
    return TeacherData;
  }



  async getTeacher(TeacherId: string): Promise<ITeacher> {
    const existingTeacher = await this.teacherModel.findById(TeacherId).exec();
    if (!existingTeacher) {
      throw new NotFoundException(`Teacher #${TeacherId} not found`);
    }
    return existingTeacher;
  }



  async deleteTeacher(TeacherId: string): Promise<ITeacher> {
    const deletedTeacher = await this.teacherModel.findByIdAndDelete(TeacherId);
    if (!deletedTeacher) {
      throw new NotFoundException(`Teacher #${TeacherId} not found`);
    }
    return deletedTeacher;
  }
}
