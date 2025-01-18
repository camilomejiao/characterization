import { Module } from '@nestjs/common';
import { JsonApiModule } from 'json-api-nestjs';
import { TypeOrmModule } from '@nestjs/typeorm';

//Entity
import { DepartmentEntity } from '../../common/entities/department.entity';
import { MunicipalityEntity } from '../../common/entities/municipality.entity';

//Controller
import { DepartmentController } from './adapters/input/department.controller';
import { MunicipalityController } from './adapters/input/municipality.controller';

//Repository
import { IDepartmentRepository } from './domain/output-ports/department.repository';
import { DepartmentMysqlRepository } from './domain/output-ports/mysql/department-mysql.repository';
import { IMunicipalityRepository } from './domain/output-ports/municipality.repository';
import { MunicipalityMysqlRepository } from './domain/output-ports/mysql/municipality-mysql.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentEntity, MunicipalityEntity])],
  controllers: [DepartmentController, MunicipalityController],
  providers: [
    {
      provide: IDepartmentRepository,
      useClass: DepartmentMysqlRepository,
    },
    {
      provide: IMunicipalityRepository,
      useClass: MunicipalityMysqlRepository,
    },
  ],
  exports: [DepartmentMunicipalityModule],
})
export class DepartmentMunicipalityModule {}
