import { DataSource } from 'typeorm';
import {
  UploadedFilesEntity,
  UploadFileStatus,
} from '../../../../../../common/entities/uploaded_files.entity';

export class UpsertUploadFileUsecase {
  public async handler(
    dataSource: DataSource,
    organizationId: number | string,
    systemUserId: number | string,
    fileName: string,
    period: string,
    status: UploadFileStatus,
  ): Promise<{ record: UploadedFilesEntity; created: boolean }> {
    const repo = dataSource.getRepository(UploadedFilesEntity);

    const where = {
      organization: { id: Number(organizationId) } as any,
      fileName,
      period,
    } as any;

    const existing = await repo.findOne({ where });

    if (existing) {
      if (existing.status !== status) {
        await repo.update(existing.id, { status } as any);
        existing.status = status;
      }
      return { record: existing, created: false };
    }

    const record: UploadedFilesEntity = repo.create({
      organization: { id: Number(organizationId) } as any,
      user: { id: Number(systemUserId) } as any,
      fileName,
      period,
      status,
    });

    const saved: UploadedFilesEntity = await repo.save(record);
    return { record: saved, created: true };
  }
}
