import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICommunityRepository } from '../community.repository';
import { CommunityEntity } from '../../../../../common/entities/community.entity';

@Injectable()
export class Community_mysqlRepository implements ICommunityRepository {
  constructor(
    @InjectRepository(CommunityEntity)
    private readonly repository: Repository<CommunityEntity>,
  ) {}

  async findOneBy(id: Partial<CommunityEntity>): Promise<CommunityEntity> {
    return await this.repository.findOneBy(id);
  }
}
