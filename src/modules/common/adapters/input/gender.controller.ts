import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GenderEntity } from '../../../../common/entities/gender.entity';

@Controller('gender')
export class GenderController {
  constructor(
    @InjectRepository(GenderEntity)
    private readonly genderRepository: Repository<GenderEntity>,
  ) {}

  @Get()
  async getGender() {
    return await this.genderRepository.find();
  }
}
