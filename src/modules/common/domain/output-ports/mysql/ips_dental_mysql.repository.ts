import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ips_dentalEntity } from '../../../../../common/entities/ips_dental.entity';
import { IIps_dentalRepository } from '../ips_dental.repository';

@Injectable()
export class IpsDentalMysqlRepository implements IIps_dentalRepository {
  constructor(
    @InjectRepository(Ips_dentalEntity)
    private readonly repository: Repository<Ips_dentalEntity>,
  ) {}

  async findOneBy(id: Partial<Ips_dentalEntity>): Promise<Ips_dentalEntity> {
    return await this.repository.findOneBy(id);
  }
}
