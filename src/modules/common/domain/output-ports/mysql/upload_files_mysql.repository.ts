import { IUploadFilesRepository } from '../upload_files.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadedFilesEntity } from '../../../../../common/entities/uploaded_files.entity';
@Injectable()
export class UploadFilesMysqlRepository implements IUploadFilesRepository {
  constructor(
    @InjectRepository(UploadedFilesEntity)
    private readonly repository: Repository<UploadedFilesEntity>,
  ) {}

  async findOneBy(
    id: Partial<UploadedFilesEntity>,
  ): Promise<UploadedFilesEntity> {
    return await this.repository.findOneBy(id);
  }
}
