import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';

//Dto
import { NotificationHistoryPqrsDto } from '../../../adapter/input/dto/pqrs.dto';

//Interface
import { IPqrsRepository } from '../../output-ports/pqrs.repository';
import { IApplicationStatusRepository } from '../../../../common/domain/output-ports/application_status.repository';
import { INotificationPrqsRepository } from '../../output-ports/notification_prqs.repository';

//Entity
import { Pqrs_notificationEntity } from '../../../../../common/entities/pqrs_notification.entity';
import { Application_statusEntity } from '../../../../../common/entities/application_status.entity';

export class Create_notification_pqrsUsecase {
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
  ): Promise<Pqrs_notificationEntity> {
    const pqrs = await this.pqrsRepository.findOneBy({ id });
    if (!pqrs) throw new NotFoundException(`PQRS with ID ${id} not found`);

    let statusEntity: Application_statusEntity;

    if (dto.applicationStatusId) {
      statusEntity = await this.applicationStatusRepository.findOneBy({
        id: dto.applicationStatusId,
      });
      if (!statusEntity)
        throw new BadRequestException('applicationStatusId inválido');

      pqrs.applicationStatus = statusEntity;

      await this.pqrsRepository.update(pqrs);
    }

    const notification = new Pqrs_notificationEntity({
      pqrs,
      status: statusEntity,
      notification: dto.notification,
    });

    return await this.notificationPrqsRepository.create(notification);
  }
}
