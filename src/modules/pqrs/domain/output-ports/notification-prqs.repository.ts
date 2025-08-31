import { PqrsNotificationEntity } from '../../../../common/entities/pqrs-notification.entity';

export interface INotificationPrqsRepository {
  create(entity: PqrsNotificationEntity): Promise<PqrsNotificationEntity>;

  findOneBy(
    condition: Partial<PqrsNotificationEntity>,
  ): Promise<PqrsNotificationEntity>;

  deleteManyBy(condition: Partial<PqrsNotificationEntity>): Promise<void>;
}

export const INotificationPrqsRepository = Symbol(
  'INotificationPrqsRepository',
);
