/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateClassDto } from 'src/dto/create-Class.dto';
import { IClass } from 'src/interface/Class.interface';
import { Model } from 'mongoose';
import { UpdateClassDto } from 'src/dto/update-Class.dto';

@Injectable()
export class ClassService {
  constructor(@InjectModel('Class') private classModel: Model<IClass>) {}

  async createClass(createClassDto: CreateClassDto): Promise<IClass> {
    const newClass = await new this.classModel(createClassDto);
    return newClass.save();
  }

  async updateClass(
    ClassId: string,
    updateClassDto: UpdateClassDto,
  ): Promise<IClass> {
    const existingClass = await this.classModel.findByIdAndUpdate(
      ClassId,
      updateClassDto,
      { new: true },
    );
    if (!existingClass) {
      throw new NotFoundException(`Class #${ClassId} not found`);
    }
    return existingClass;
  }


  async getAllClasses(): Promise<IClass[]> {
    const ClassData = await this.classModel.find();
    if (!ClassData || ClassData.length == 0) {
      throw new NotFoundException('Class data not found!');
    }
    return ClassData;
  }



  async getClass(ClassId: string): Promise<IClass> {
    const existingClass = await this.classModel.findById(ClassId).exec();
    if (!existingClass) {
      throw new NotFoundException(`Class #${ClassId} not found`);
    }
    return existingClass;
  }



  async deleteClass(ClassId: string): Promise<IClass> {
    const deletedClass = await this.classModel.findByIdAndDelete(ClassId);
    if (!deletedClass) {
      throw new NotFoundException(`Class #${ClassId} not found`);
    }
    return deletedClass;
  }
}

