import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ips_primaryEntity } from '../../../../common/entities/ips_primary.entity';

@Controller('ips-primary')
export class Ips_primaryController {
  constructor(
    @InjectRepository(Ips_primaryEntity)
    private readonly ipsPrimaryRepository: Repository<Ips_primaryEntity>,
  ) {}

  @Get()
  async getIpsPrimary() {
    return await this.ipsPrimaryRepository.find();
  }
}
