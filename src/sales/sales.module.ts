import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sale } from './entities/sale.entity';
import { EnrollmentsModule } from '../enrollments/enrollments.module';
import { UsersModule } from '../users/users.module';
import { ClientsModule } from '../clients/clients.module';
import { CatalogsModule } from '../catalogs/catalogs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale]),
    EnrollmentsModule,
    UsersModule,
    ClientsModule,
    CatalogsModule,
  ],
  controllers: [SalesController],
  providers: [SalesService],
  exports: [SalesService],
})
export class SalesModule {}
