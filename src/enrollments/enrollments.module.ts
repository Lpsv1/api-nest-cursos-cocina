import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { Enrollment } from './entities/enrollment.entity';
import { ClientsModule } from '../clients/clients.module';
import { CoursesModule } from '../courses/courses.module';
import { SpecialtiesModule } from '../specialties/specialties.module';
import { BranchesModule } from '../branches/branches.module';
import { CatalogsModule } from '../catalogs/catalogs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Enrollment]),
    ClientsModule,
    CoursesModule,
    SpecialtiesModule,
    BranchesModule,
    CatalogsModule,
  ],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService],
  exports: [EnrollmentsService],
})
export class EnrollmentsModule {}
