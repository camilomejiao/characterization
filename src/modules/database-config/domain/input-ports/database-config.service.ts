import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../../../../common/entities/user.entity';
import { Role } from '../../../../common/entities/role.entity';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  async createTypeOrmOptions(
    connectionName?: string,
  ): Promise<TypeOrmModuleOptions> {
    const host = this.configService.get<string>('databases.host');
    const port = this.configService.get<number>('databases.port');
    const database = this.configService.get<string>('databases.main');
    const username = this.configService.get<string>('databases.username');
    const password = this.configService.get<string>('databases.password');
    console.log(host, port, database, username, password);

    return {
      name: connectionName || 'characterization',
      type: 'mysql',
      host,
      port,
      database,
      username,
      password,
      entities: [User, Role],
      synchronize: false,
    };
  }
}
