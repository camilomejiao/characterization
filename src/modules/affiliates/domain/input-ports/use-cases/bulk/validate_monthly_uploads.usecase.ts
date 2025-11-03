import { UploadedFilesEntity } from '../../../../../../common/entities/uploaded_files.entity';
import { DataSource, Between } from 'typeorm';
import { UnprocessableEntityException } from '@nestjs/common';
import dayjs from 'dayjs';

export class ValidateMonthlyUploadsUsecase {
  constructor(private readonly dataSource: DataSource) {}

  public async handler(organizationId: number | string, period: string) {
    // period AAAAMM → rango de fechas del mes
    const year = Number(period.slice(0, 4));
    const month = Number(period.slice(4, 6)); // 01..12
    const start = dayjs(`${year}-${String(month).padStart(2, '0')}-01`)
      .startOf('month')
      .toDate();
    const end = dayjs(start).endOf('month').toDate();

    const repo = this.dataSource.getRepository(UploadedFilesEntity);
    const count = await repo.count({
      where: {
        organization: { id: Number(organizationId) } as any,
        createdAt: Between(start, end),
      } as any,
    });

    if (count >= 2) {
      throw new UnprocessableEntityException(
        'Superas el número de cargues en este mes',
      );
    }
  }
}
