/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import {Query} from 'express-serve-static-core'
import { User } from 'src/auth/schema/user.schema';
import { StudentDocument } from './schema/student.schema';

@Injectable()
export class StudentService {
  constructor(@InjectModel('Student') private studentModel:Model<StudentDocument>) { }
  async createStudent(createStudentDto: CreateStudentDto, user:User): Promise<StudentDocument> {
    const data = Object.assign(createStudentDto,{user: user?._id})
     const newStudent = await new this.studentModel(data);
     return newStudent.save();
  }
  async updateStudent(studentId: string, updateStudentDto: UpdateStudentDto): Promise<StudentDocument> {
      const existingStudent = await        this.studentModel.findByIdAndUpdate(studentId, updateStudentDto, { new: true });
     if (!existingStudent) {
       throw new NotFoundException(`Student #${studentId} not found`);
     }
     return existingStudent;
  }
  async getAllStudents(query:Query): Promise<StudentDocument[]> {
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
  async getStudent(studentId: string): Promise<StudentDocument> {
     const existingStudent = await     this.studentModel.findById(studentId).exec();
     if (!existingStudent) {
      throw new NotFoundException(`Student #${studentId} not found`);
     }
     return existingStudent;
  }
  async deleteStudent(studentId: string): Promise<StudentDocument> {
      const deletedStudent = await this.studentModel.findByIdAndDelete(studentId);
     if (!deletedStudent) {
       throw new NotFoundException(`Student #${studentId} not found`);
     }
     return deletedStudent;
  }

}
