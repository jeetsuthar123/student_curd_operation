/* eslint-disable prettier/prettier */

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateTeacherDto } from 'src/dto/create-Teacher.dto';
import { UpdateTeacherDto } from 'src/dto/update-Teacher.dto';
import { TeacherService } from 'src/service/teacher/teacher.service';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}
  @Post()
  async createTeacher(
    @Res() response,
    @Body() createTeacherDto: CreateTeacherDto,
  ) {
    try {
      const newTeacher =
        await this.teacherService.createTeacher(createTeacherDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Teacher has been created successfully',
        newTeacher,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Teacher not created!',
        error: 'Bad Request',
      });
    }
  }
  @Put('/:id')
  async updateTeacher(
    @Res() response,
    @Param('id') TeacherId: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    try {
      const existingTeacher = await this.teacherService.updateTeacher(
        TeacherId,
        updateTeacherDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Teacher has been successfully updated',
        existingTeacher,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get()
  async getTeachers(@Res() response) {
    try {
      const TeacherData = await this.teacherService.getAllTeachers();
      return response.status(HttpStatus.OK).json({
        message: 'All Teachers data found successfully',
        TeacherData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getTeacher(@Res() response, @Param('id') TeacherId: string) {
    try {
      const existingTeacher = await this.teacherService.getTeacher(TeacherId);
      return response.status(HttpStatus.OK).json({
        message: 'Teacher found successfully',
        existingTeacher,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:id')
  async deleteTeacher(@Res() response, @Param('id') TeacherId: string) {
    try {
      const deletedTeacher = await this.teacherService.deleteTeacher(TeacherId);
      return response.status(HttpStatus.OK).json({
        message: 'Teacher deleted successfully',
        deletedTeacher,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
