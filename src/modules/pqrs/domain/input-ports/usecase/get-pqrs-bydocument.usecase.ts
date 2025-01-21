import { Inject } from '@nestjs/common';
import { IPqrsRepository } from '../../output-ports/pqrs.repository';

export class GetPqrsBydocumentUsecase {
  constructor(
    @Inject(IPqrsRepository)
    private readonly pqrsRepository: IPqrsRepository,
  ) {}

  public async handler(identificationNumber: number) {
    const pqrsList =
      await this.pqrsRepository.findByAffiliateIdentification(
        identificationNumber,
      );

    if (!pqrsList || pqrsList.length === 0) {
      throw new Error(
        `No PQRS found for affiliate with identification number ${identificationNumber}`,
      );
    }

    return pqrsList;
  }
}
