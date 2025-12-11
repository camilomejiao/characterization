import { Between, DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { UploadedFilesEntity } from '../../../../../../common/entities/uploaded_files.entity';
import dayjs from 'dayjs';

export class ValidateMonthlyUploadsUsecase {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async handler(organizationId: number) {
    const repo = this.dataSource.getRepository(UploadedFilesEntity);

    const start = dayjs().startOf('month').toDate();
    const end = dayjs().endOf('month').toDate();

    const uploadsThisMonth = await repo.findOne({
      where: {
        organization: { id: Number(organizationId) },
        created_at: Between(start, end),
      },
    });

    if (!uploadsThisMonth) {
      return { count: 0 };
    }

    const currentCount = Number(uploadsThisMonth.count);

    if (currentCount >= 3) {
      throw new BadRequestException({
        errors: [
          {
            status: 400,
            title: 'Errores de validación',
            detail: `La organización ya realizó ${currentCount} cargas este mes. Solo se permiten 3.`,
          },
        ],
      });
    }

    return uploadsThisMonth;
  }
}
