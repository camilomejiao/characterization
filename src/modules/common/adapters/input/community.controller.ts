import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunityEntity } from '../../../../common/entities/community.entity';

@Controller('community')
export class CommunityController {
  constructor(
    @InjectRepository(CommunityEntity)
    private readonly communityRepository: Repository<CommunityEntity>,
  ) {}

  @Get()
  async getCommunity() {
    return await this.communityRepository.find();
  }
}
