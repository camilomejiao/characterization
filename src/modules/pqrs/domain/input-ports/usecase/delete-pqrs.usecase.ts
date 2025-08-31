import { Inject } from '@nestjs/common';
import { IPqrsRepository } from '../../output-ports/pqrs.repository';
import { INotificationPrqsRepository } from '../../output-ports/notification-prqs.repository';

export class DeletePqrsUsecase {
  constructor(
    @Inject(IPqrsRepository)
    private readonly pqrsRepository: IPqrsRepository,
    @Inject(INotificationPrqsRepository)
    private readonly notificationPrqsRepository: INotificationPrqsRepository,
  ) {}

  public async handler(id: number) {
    const pqrs = await this.pqrsRepository.findOneBy({ id });

    if (!pqrs) {
      throw new Error(`PQRS with ID ${id} not found`);
    }

    // 1. Eliminar notificaciones relacionadas
    await this.notificationPrqsRepository.deleteManyBy({ pqrs });

    // 2. Eliminar PQRS
    await this.pqrsRepository.delete(id);
  }
}
