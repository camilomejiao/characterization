import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Affiliated_stateEntity } from '../../../../common/entities/affiliated_state.entity';

@Controller('affiliated-state')
export class Affiliated_stateController {
  constructor(
    @InjectRepository(Affiliated_stateEntity)
    private readonly affiliatedStateRepository: Repository<Affiliated_stateEntity>,
  ) {}

  @Get()
  async getAffiliatedState() {
    return await this.affiliatedStateRepository.find();
  }
}
