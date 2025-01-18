import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MembershipClassEntity } from '../../../../common/entities/membership-class.entity';

@Controller('membership-class')
export class MembershipClassController {
  constructor(
    @InjectRepository(MembershipClassEntity)
    private readonly membershipClassRepository: Repository<MembershipClassEntity>,
  ) {}

  @Get()
  async getPopulationType() {
    return await this.membershipClassRepository.find();
  }
}
