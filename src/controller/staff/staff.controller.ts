/* eslint-disable prettier/prettier */

import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateStaffDto } from 'src/dto/create-Staff.dto';
import { UpdateStaffDto } from 'src/dto/update-Staff.dto';
import { StaffService } from 'src/service/Staff/Staff.service';


@Controller('staff')
export class StaffController {
   constructor(private staffService: StaffService) { }
   
@Post()
   async createStaff(@Res() response, @Body() createStaffDto: CreateStaffDto) {
  try {
    const newStaff = await this.staffService.createStaff(createStaffDto);
    return response.status(HttpStatus.CREATED).json({
    message: 'Staff has been created successfully',
    newStaff,});
 } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: Staff not created!',
    error: 'Bad Request'
 });
 }
}
@Put('/:id')
async updateStaff(@Res() response,@Param('id') StaffId: string,
@Body() updateStaffDto: UpdateStaffDto) {
  try {
   const existingStaff = await this.staffService.updateStaff(StaffId, updateStaffDto);
  return response.status(HttpStatus.OK).json({
  message: 'Staff has been successfully updated',
  existingStaff,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Get()
async getStaffs(@Res() response) {
try {
  const StaffData = await this.staffService.getAllStaffs();
  return response.status(HttpStatus.OK).json({
  message: 'All Staffs data found successfully',StaffData,});
 } catch (err) {
  return response.status(err.status).json(err.response);
 }
}
@Get('/:id')
async getStaff(@Res() response, @Param('id') StaffId: string) {
 try {
    const existingStaff = await
this.staffService.getStaff(StaffId);
    return response.status(HttpStatus.OK).json({
    message: 'Staff found successfully',existingStaff,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Delete('/:id')
async deleteStaff(@Res() response, @Param('id') StaffId: string)
{
  try {
    const deletedStaff = await this.staffService.deleteStaff(StaffId);
    return response.status(HttpStatus.OK).json({
    message: 'Staff deleted successfully',
    deletedStaff,});
  }catch (err) {
    return response.status(err.status).json(err.response);
  }
 }
}
