import { INotificationPrqsRepository } from '../notification-prqs.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { PqrsNotificationEntity } from '../../../../../common/entities/pqrs-notification.entity';

@Injectable()
export class NotificationPrqsMysqlRepository
  implements INotificationPrqsRepository
{
  constructor(
    @InjectRepository(PqrsNotificationEntity)
    private readonly repository: Repository<PqrsNotificationEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(
    entity: PqrsNotificationEntity,
  ): Promise<PqrsNotificationEntity> {
    return await this.repository.save(entity);
  }

  async findOneBy(
    condition: Partial<PqrsNotificationEntity>,
  ): Promise<PqrsNotificationEntity> {
    return await this.repository.findOne({
      where: condition,
      relations: [],
    });
  }

  async deleteManyBy(
    condition: Partial<PqrsNotificationEntity>,
  ): Promise<void> {
    await this.repository.delete(condition);
  }
}
