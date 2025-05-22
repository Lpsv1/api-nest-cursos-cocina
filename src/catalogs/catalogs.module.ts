import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from './entities/level.entity';
import { Modality } from './entities/modality.entity';
import { Shift } from './entities/shift.entity';
import { CourseStatus } from './entities/course-status.entity';
import { PaymentMethod } from './entities/payment-method.entity';
import { CatalogsController } from './catalogs.controller';
import { CatalogsService } from './catalogs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Level,
      Modality,
      Shift,
      CourseStatus,
      PaymentMethod,
    ]),
  ],
  controllers: [CatalogsController],
  providers: [CatalogsService],
  exports: [CatalogsService],
})
export class CatalogsModule {}
