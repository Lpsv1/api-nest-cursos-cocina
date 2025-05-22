import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstructorsService } from './instructors.service';
import { InstructorsController } from './instructors.controller';
import { Instructor } from './entities/instructor.entity';
import { BranchesModule } from '../branches/branches.module';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Instructor]),
    BranchesModule,
    CoursesModule,
  ],
  controllers: [InstructorsController],
  providers: [InstructorsService],
  exports: [InstructorsService],
})
export class InstructorsModule {}
