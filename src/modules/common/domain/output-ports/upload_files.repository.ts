import { UploadedFilesEntity } from '../../../../common/entities/uploaded_files.entity';

export interface IUploadFilesRepository {
  findOneBy(id: Partial<UploadedFilesEntity>): Promise<UploadedFilesEntity>;
}

export const IUploadFilesRepository = Symbol('IUploadFilesRepository');
