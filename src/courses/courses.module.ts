import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course } from './entities/course.entity';
import { CatalogsModule } from '../catalogs/catalogs.module';
import { SpecialtiesModule } from '../specialties/specialties.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    CatalogsModule,
    SpecialtiesModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
