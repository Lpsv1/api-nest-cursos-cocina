import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import mailConfig from './config/mail.config';

// Módulos de la aplicación
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { CoursesModule } from './courses/courses.module';
import { ClientsModule } from './clients/clients.module';
import { InstructorsModule } from './instructors/instructors.module';
import { BranchesModule } from './branches/branches.module';
import { SpecialtiesModule } from './specialties/specialties.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { SalesModule } from './sales/sales.module';
import { CatalogsModule } from './catalogs/catalogs.module';

@Module({
  imports: [
    // Configuración
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig, mailConfig],
    }),

    // Base de datos
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
    }),

    // JWT para autenticación
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: {
          expiresIn: configService.get('jwt.expiresIn'),
        },
      }),
    }),

    // Módulos de la aplicación
    AuthModule,
    UsersModule,
    RolesModule,
    CoursesModule,
    ClientsModule,
    InstructorsModule,
    BranchesModule,
    SpecialtiesModule,
    EnrollmentsModule,
    SalesModule,
    CatalogsModule,
  ],
})
export class AppModule {}
