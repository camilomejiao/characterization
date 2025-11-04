import { Between, DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { UnprocessableEntityException } from '@nestjs/common';
import { UploadedFilesEntity } from '../../../../../../common/entities/uploaded_files.entity';
import dayjs from 'dayjs';

export class ValidateMonthlyUploadsUsecase {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  public async handler(organizationId: number | string, period: string) {
    try {
      const year = Number(period.slice(0, 4));
      const month = Number(period.slice(4, 6));
      const start = dayjs(`${year}-${String(month).padStart(2, '0')}-01`)
        .startOf('month')
        .toDate();
      const end = dayjs(start).endOf('month').toDate();

      const repo = this.dataSource.getRepository(UploadedFilesEntity);
      const count = await repo.count({
        where: {
          organization: { id: Number(organizationId) } as any,
          created_at: Between(start, end),
        },
      });

      if (count >= 2) {
        throw new UnprocessableEntityException(
          'Superas el número de cargues en este mes',
        );
      }
    } catch (error) {
      console.error('❌ Error en ValidateMonthlyUploadsUsecase:', error);
      throw error;
    }
  }
}
