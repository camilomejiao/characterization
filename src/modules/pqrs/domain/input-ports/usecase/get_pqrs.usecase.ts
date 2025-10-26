import { Inject } from '@nestjs/common';
import { IPqrsRepository } from '../../output-ports/pqrs.repository';

export class Get_pqrsUsecase {
  constructor(
    @Inject(IPqrsRepository)
    private pqrsRepository: IPqrsRepository,
  ) {}

  public async handler() {
    return await this.pqrsRepository.findAll();
  }
}
