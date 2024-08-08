/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeacherDocument } from './schema/teacher.schema';

@Injectable()
export class TeacherService {

  constructor(@InjectModel('Teacher') private teacherModel: Model<TeacherDocument>) {}

  async createTeacher(createTeacherDto: CreateTeacherDto): Promise<TeacherDocument> {
    const newTeacher = await new this.teacherModel(createTeacherDto);
    return newTeacher.save();
  }

  async updateTeacher(
    TeacherId: string,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<TeacherDocument> {
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


  async getAllTeachers(): Promise<TeacherDocument[]> {
    const TeacherData = await this.teacherModel.find();
    if (!TeacherData || TeacherData.length == 0) {
      throw new NotFoundException('Teachers data not found!');
    }
    return TeacherData;
  }



  async getTeacher(TeacherId: string): Promise<TeacherDocument> {
    const existingTeacher = await this.teacherModel.findById(TeacherId).exec();
    if (!existingTeacher) {
      throw new NotFoundException(`Teacher #${TeacherId} not found`);
    }
    return existingTeacher;
  }



  async deleteTeacher(TeacherId: string): Promise<TeacherDocument> {
    const deletedTeacher = await this.teacherModel.findByIdAndDelete(TeacherId);
    if (!deletedTeacher) {
      throw new NotFoundException(`Teacher #${TeacherId} not found`);
    }
    return deletedTeacher;
  }
}
