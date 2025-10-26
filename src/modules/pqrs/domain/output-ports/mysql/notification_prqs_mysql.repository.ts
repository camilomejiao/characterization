import { INotificationPrqsRepository } from '../notification_prqs.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Pqrs_notificationEntity } from '../../../../../common/entities/pqrs_notification.entity';

@Injectable()
export class Notification_prqs_mysqlRepository
  implements INotificationPrqsRepository
{
  constructor(
    @InjectRepository(Pqrs_notificationEntity)
    private readonly repository: Repository<Pqrs_notificationEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(
    entity: Pqrs_notificationEntity,
  ): Promise<Pqrs_notificationEntity> {
    return await this.repository.save(entity);
  }

  async findOneBy(
    condition: Partial<Pqrs_notificationEntity>,
  ): Promise<Pqrs_notificationEntity> {
    return await this.repository.findOne({
      where: condition,
      relations: [],
    });
  }

  async deleteManyBy(
    condition: Partial<Pqrs_notificationEntity>,
  ): Promise<void> {
    await this.repository.delete(condition);
  }
}
