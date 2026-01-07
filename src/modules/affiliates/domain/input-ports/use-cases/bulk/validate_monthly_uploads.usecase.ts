import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import {
  UploadedFilesEntity,
  UploadFileStatus,
} from '../../../../../../common/entities/uploaded_files.entity';

export class ValidateMonthlyUploadsUsecase {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async handler(organizationId: number, period: string) {
    const repo = this.dataSource.getRepository(UploadedFilesEntity);

    const qbCount = await repo
      .createQueryBuilder('uf')
      .where('uf.organization_id = :orgId', { orgId: Number(organizationId) })
      .andWhere('uf.period = :period', { period })
      .andWhere('uf.status IN (:...st)', {
        st: [UploadFileStatus.COMPLETED],
      })
      .getCount();

    if (qbCount > 5) {
      throw new BadRequestException({
        errors: [
          {
            status: 400,
            title: 'Errores de validación',
            detail: `La organización ya realizó ${qbCount} carga(s) para el periodo ${period}. Solo se permiten 3.`,
          },
        ],
      });
    }

    return { count: qbCount };
  }
}
