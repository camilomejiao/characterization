import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './domain/input-ports/database-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
      extraProviders: [Logger],
    }),
  ],
  exports: [DatabaseModule],
})
export class DatabaseModule {}
