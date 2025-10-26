import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ips_primaryEntity } from '../../../../../common/entities/ips_primary.entity';
import { IIps_primaryRepository } from '../ips_primary.repository';

@Injectable()
export class IpsPrimaryMysqlRepository implements IIps_primaryRepository {
  constructor(
    @InjectRepository(Ips_primaryEntity)
    private readonly repository: Repository<Ips_primaryEntity>,
  ) {}

  async findOneBy(id: Partial<Ips_primaryEntity>): Promise<Ips_primaryEntity> {
    return await this.repository.findOneBy(id);
  }
}
