import { NotificationHistoryPqrsDto } from '../../../adapter/input/dto/pqrs.dto';
import { Inject } from '@nestjs/common';
import { IPqrsRepository } from '../../output-ports/pqrs.repository';
import { IApplicationStatusRepository } from '../../../../common/domain/output-ports/application-status.repository';
import { PqrsNotificationEntity } from '../../../../../common/entities/pqrs-notification.entity';

export class CreateNotoficationPqrsUsecase {
  constructor(
    @Inject(IPqrsRepository)
    private readonly pqrsRepository: IPqrsRepository,
    @Inject(IApplicationStatusRepository)
    private readonly applicationStatusRepository: IApplicationStatusRepository,

  ) {}

  public async handler(
    id: number,
    notificationHistoryPqrsDto: NotificationHistoryPqrsDto,
  ): Promise<PqrsNotificationEntity> {
    const pqrs = await this.pqrsRepository.findOneBy({ id });
    if (!pqrs) {
      throw new Error(`PQRS with ID ${id} not found`);
    }

    return await
  }
}
