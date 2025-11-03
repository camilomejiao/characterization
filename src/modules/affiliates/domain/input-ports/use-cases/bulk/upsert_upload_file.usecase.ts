import { DataSource } from 'typeorm';
import { UploadedFilesEntity } from '../../../../../../common/entities/uploaded_files.entity';

export class UpsertUploadFileUsecase {
  constructor() {}

  public async handler(
    dataSource: DataSource,
    organizationId: number | string,
    systemUserId: number | string,
    fileName: string,
    period: string,
  ) {
    const repo = dataSource.getRepository(UploadedFilesEntity);

    let record = await repo.findOne({
      where: {
        organization: { id: Number(organizationId) } as any,
        user: { id: Number(systemUserId) } as any,
        fileName,
        // si tienes columna period, agrega: period
      } as any,
      relations: { organization: true, user: true },
    });

    if (!record) {
      record = repo.create({
        organization: { id: Number(organizationId) } as any,
        user: { id: Number(systemUserId) } as any,
        fileName,
        count: '1',
      });
      await repo.save(record);
      return;
    }

    const count = Number(record.count ?? 0) + 1;
    await repo.update(record.id, { count: String(count) });
  }
}
