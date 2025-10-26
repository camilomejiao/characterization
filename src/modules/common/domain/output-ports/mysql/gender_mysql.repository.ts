import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GenderEntity } from '../../../../../common/entities/gender.entity';
import { IGenderRepository } from '../gender.repository';

@Injectable()
export class Gender_mysqlRepository implements IGenderRepository {
  constructor(
    @InjectRepository(GenderEntity)
    private readonly repository: Repository<GenderEntity>,
  ) {}

  async findOneBy(id: Partial<GenderEntity>): Promise<GenderEntity> {
    return await this.repository.findOneBy(id);
  }
}
