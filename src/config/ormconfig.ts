import { NestFactory } from '@nestjs/core';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { AppModule } from '../app.module';
import InitSeeder from 'database/seeds/init.seeder';

export default NestFactory.create(AppModule)
  .then((app) => app.get(DataSource))
  .then((dataSource) => Promise.all([dataSource, dataSource.destroy()]))
  .then(([dataSource]) => {
    const options: DataSourceOptions & SeederOptions = {
      type: 'mysql',
      seeds: [InitSeeder],
      migrations: ['dist/database/migrations/*.js'],
    };

    dataSource.setOptions(options);
    return dataSource;
  });
