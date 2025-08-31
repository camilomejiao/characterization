import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AffiliatedStateEntity } from '../../../../common/entities/affiliated-state.entity';

@Controller('affiliated-state')
export class AffiliatedStateController {
  constructor(
    @InjectRepository(AffiliatedStateEntity)
    private readonly affiliatedStateRepository: Repository<AffiliatedStateEntity>,
  ) {}

  @Get()
  async getAffiliatedState() {
    return await this.affiliatedStateRepository.find();
  }
}
