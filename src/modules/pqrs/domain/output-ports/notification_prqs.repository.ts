import { Pqrs_notificationEntity } from '../../../../common/entities/pqrs_notification.entity';

export interface INotificationPrqsRepository {
  create(entity: Pqrs_notificationEntity): Promise<Pqrs_notificationEntity>;

  findOneBy(
    condition: Partial<Pqrs_notificationEntity>,
  ): Promise<Pqrs_notificationEntity>;

  deleteManyBy(condition: Partial<Pqrs_notificationEntity>): Promise<void>;
}

export const INotificationPrqsRepository = Symbol(
  'INotificationPrqsRepository',
);
