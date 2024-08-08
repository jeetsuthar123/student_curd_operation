/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { StaffModule } from './staff/staff.module';
import { SchoolModule } from './school/school.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './common/config/env.config';
import { DbConfig } from './common/config/env.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/student_database'),
    // configure the environment
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validate,
      envFilePath: ['.env', '.env.local'],
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    // configure the database connection
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<DbConfig>('db')?.connectionString,
        };
      },
    }),
    StaffModule,
    StudentModule,
    TeacherModule,
    SchoolModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
