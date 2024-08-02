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
import { CreateSchoolDto } from 'src/dto/create-School.dto';
import { UpdateSchoolDto } from 'src/dto/update-School.dto';
import { SchoolService } from 'src/service/School/School.service';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}
  @Post()
  async createSchool(
    @Res() response,
    @Body() createSchoolDto: CreateSchoolDto,
  ) {
    try {
      const newSchool =
        await this.schoolService.createSchool(createSchoolDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'School has been created successfully',
        newSchool,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: School not created!',
        error: 'Bad Request',
      });
    }
  }
  @Put('/:id')
  async updateSchool(
    @Res() response,
    @Param('id') SchoolId: string,
    @Body() updateSchoolDto: UpdateSchoolDto,
  ) {
    try {
      const existingSchool = await this.schoolService.updateSchool(
        SchoolId,
        updateSchoolDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'School has been successfully updated',
        existingSchool,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get()
  async getSchools(@Res() response) {
    try {
      const SchoolData = await this.schoolService.getAllSchools();
      return response.status(HttpStatus.OK).json({
        message: 'All Schools data found successfully',
        SchoolData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getSchool(@Res() response, @Param('id') SchoolId: string) {
    try {
      const existingSchool = await this.schoolService.getSchool(SchoolId);
      return response.status(HttpStatus.OK).json({
        message: 'School found successfully',
        existingSchool,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:id')
  async deleteSchool(@Res() response, @Param('id') SchoolId: string) {
    try {
      const deletedSchool = await this.schoolService.deleteSchool(SchoolId);
      return response.status(HttpStatus.OK).json({
        message: 'School deleted successfully',
        deletedSchool,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
