import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';

//Dto
import { NotificationHistoryPqrsDto } from '../../../adapter/input/dto/pqrs.dto';

//Interface
import { IPqrsRepository } from '../../output-ports/pqrs.repository';
import { IApplicationStatusRepository } from '../../../../common/domain/output-ports/application-status.repository';
import { INotificationPrqsRepository } from '../../output-ports/notification-prqs.repository';

//Entity
import { PqrsNotificationEntity } from '../../../../../common/entities/pqrs-notification.entity';
import { ApplicationStatusEntity } from '../../../../../common/entities/application-status.entity';

export class CreateNotificationPqrsUsecase {
  constructor(
    @Inject(IPqrsRepository)
    private readonly pqrsRepository: IPqrsRepository,
    @Inject(IApplicationStatusRepository)
    private readonly applicationStatusRepository: IApplicationStatusRepository,
    @Inject(INotificationPrqsRepository)
    private readonly notificationPrqsRepository: INotificationPrqsRepository,
  ) {}

  public async handler(
    id: number,
    dto: NotificationHistoryPqrsDto,
  ): Promise<PqrsNotificationEntity> {
    const pqrs = await this.pqrsRepository.findOneBy({ id });
    if (!pqrs) throw new NotFoundException(`PQRS with ID ${id} not found`);

    let statusEntity: ApplicationStatusEntity;

    if (dto.applicationStatusId) {
      statusEntity = await this.applicationStatusRepository.findOneBy({
        id: dto.applicationStatusId,
      });
      if (!statusEntity)
        throw new BadRequestException('applicationStatusId inválido');

      pqrs.applicationStatus = statusEntity;

      await this.pqrsRepository.update(pqrs);
    }

    const notification = new PqrsNotificationEntity({
      pqrs,
      status: statusEntity,
      notification: dto.notification,
    });

    return await this.notificationPrqsRepository.create(notification);
  }
}
