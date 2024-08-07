/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IStudent } from './interface/student.interface';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import {Query} from 'express-serve-static-core'

@Injectable()
export class StudentService {
  constructor(@InjectModel('Student') private studentModel:Model<IStudent>) { }
  async createStudent(createStudentDto: CreateStudentDto): Promise<IStudent> {
     const newStudent = await new this.studentModel(createStudentDto);
     return newStudent.save();
  }
  async updateStudent(studentId: string, updateStudentDto: UpdateStudentDto): Promise<IStudent> {
      const existingStudent = await        this.studentModel.findByIdAndUpdate(studentId, updateStudentDto, { new: true });
     if (!existingStudent) {
       throw new NotFoundException(`Student #${studentId} not found`);
     }
     return existingStudent;
  }
  async getAllStudents(query:Query): Promise<IStudent[]> {
     console.log(query);
     const resPerPage = 2
     const currentPage = Number(query.page) || 1
     const skip = resPerPage * (currentPage - 1)


     const keyword = query.keyword ? {
            name : {
                $regex : query.keyword,
                $options : 'i'
            }
     } : {}

      const studentData = await this.studentModel.find({...keyword}).limit(resPerPage).skip(skip);
      if (!studentData || studentData.length == 0) {
          throw new NotFoundException('Students data not found!');
      }
      return studentData;
  }
  async getStudent(studentId: string): Promise<IStudent> {
     const existingStudent = await     this.studentModel.findById(studentId).exec();
     if (!existingStudent) {
      throw new NotFoundException(`Student #${studentId} not found`);
     }
     return existingStudent;
  }
  async deleteStudent(studentId: string): Promise<IStudent> {
      const deletedStudent = await this.studentModel.findByIdAndDelete(studentId);
     if (!deletedStudent) {
       throw new NotFoundException(`Student #${studentId} not found`);
     }
     return deletedStudent;
  }

}
