import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database-config/database-config.module';
import { APP_FILTER } from '@nestjs/core';
import { JsonApiErrorFilter } from './common/util/jsonapi-error.handler';
import { ConfigModule } from '@nestjs/config';
import environment from './config/environment';
import { RoleModule } from './modules/role/role.module';

@Module({
  imports: [
    DatabaseModule,
    RoleModule,
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
