/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

import {Query as ExpressQuery} from 'express-serve-static-core'
import { AuthGuard } from '@nestjs/passport';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @UseGuards(AuthGuard())
   async createStudent(@Res() response, @Body() createStudentDto: CreateStudentDto, @Req() req) {
  try {
    const newStudent = await this.studentService.createStudent(createStudentDto,req.user);
    return response.status(HttpStatus.CREATED).json({
    message: 'Student has been created successfully',
    newStudent,});
 } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: Student not created!',
    error: 'Bad Request'
 });
 }
}
@Put('/:id')
async updateStudent(@Res() response,@Param('id') studentId: string,
@Body() updateStudentDto: UpdateStudentDto) {
  try {
   const existingStudent = await this.studentService.updateStudent(studentId, updateStudentDto);
  return response.status(HttpStatus.OK).json({
  message: 'Student has been successfully updated',
  existingStudent,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Get()
async getStudents(@Res() response,  @Query() query: ExpressQuery) {
try {
  const studentData = await this.studentService.getAllStudents(query);
  return response.status(HttpStatus.OK).json({
  message: 'All students data found successfully',studentData,});
 } catch (err) {
  return response.status(err.status).json(err.response);
 }
}
@Get('/:id')
async getStudent(@Res() response, @Param('id') studentId: string) {
 try {
    const existingStudent = await
this.studentService.getStudent(studentId);
    return response.status(HttpStatus.OK).json({
    message: 'Student found successfully',existingStudent,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Delete('/:id')
async deleteStudent(@Res() response, @Param('id') studentId: string)
{
  try {
    const deletedStudent = await this.studentService.deleteStudent(studentId);
    return response.status(HttpStatus.OK).json({
    message: 'Student deleted successfully',
    deletedStudent,});
  }catch (err) {
    return response.status(err.status).json(err.response);
  }
 }
}
