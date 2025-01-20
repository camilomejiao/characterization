import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database-config/database-config.module';
import { APP_FILTER } from '@nestjs/core';
import { JsonApiErrorFilter } from './common/util/jsonapi-error.handler';
import { ConfigModule } from '@nestjs/config';
import environment from './config/environment';
import { RoleModule } from './modules/role/role.module';
import { DepartmentMunicipalityModule } from './modules/department-municipality/department-municipality.module';
import { SystemUserModule } from './modules/sysyem-user/system-user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './modules/common/common.module';
import { AffiliatesModule } from './modules/affiliates/affiliates.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    RoleModule,
    DepartmentMunicipalityModule,
    CommonModule,
    SystemUserModule,
    AffiliatesModule,
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
