import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Membership_classEntity } from '../../../../common/entities/membership_class.entity';

@Controller('membership-class')
export class Membership_classController {
  constructor(
    @InjectRepository(Membership_classEntity)
    private readonly membershipClassRepository: Repository<Membership_classEntity>,
  ) {}

  @Get()
  async getPopulationType() {
    return await this.membershipClassRepository.find();
  }
}
