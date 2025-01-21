import { Inject } from '@nestjs/common';
import { IPqrsRepository } from '../../output-ports/pqrs.repository';

export class GetPqrsByIdUsecase {
  constructor(
    @Inject(IPqrsRepository)
    private readonly pqrsRepository: IPqrsRepository,
  ) {}

  public async handler(id: number) {
    return this.pqrsRepository.findOneBy({ id: id });
  }
}
