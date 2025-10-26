import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ips_dentalEntity } from '../../../../common/entities/ips_dental.entity';

@Controller('ips-dental')
export class Ips_dentalController {
  constructor(
    @InjectRepository(Ips_dentalEntity)
    private readonly ipsDenatlRepository: Repository<Ips_dentalEntity>,
  ) {}

  @Get()
  async getIpsDental() {
    return await this.ipsDenatlRepository.find();
  }
}
