/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolSchema } from './schema/school.schema';

@Module({

  imports: [
    MongooseModule.forFeature([{ name: 'School', schema: SchoolSchema }]),
  ],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
