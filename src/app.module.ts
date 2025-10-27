import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database-config/database-config.module';
import { APP_FILTER } from '@nestjs/core';
import { JsonApiErrorFilter } from './common/util/jsonapi-error.handler';
//
import { ConfigModule } from '@nestjs/config';
//
import environment from './config/environment';
//
import { RoleModule } from './modules/role/role.module';
import { DepartmentMunicipalityModule } from './modules/department-municipality/department-municipality.module';
import { System_userModule } from './modules/sysyem-user/system_user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './modules/common/common.module';
import { PqrsModule } from './modules/pqrs/pqrs.module';
import { UsersModule } from './modules/users/users.module';
import { AffiliatesModule } from './modules/affiliates/affiliates.module';
import { SpecialPopulationModule } from './modules/special_population/special_population.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    RoleModule,
    DepartmentMunicipalityModule,
    CommonModule,
    System_userModule,
    UsersModule,
    AffiliatesModule,
    PqrsModule,
    SpecialPopulationModule,
    ConfigModule.forRoot({
      load: [environment],
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: JsonApiErrorFilter,
    },
  ],
})
export class AppModule {}
