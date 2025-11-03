import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IOrganizationRepository } from '../../output-ports/organization.repository';

export class DeleteOrganizationUsecase {
  constructor(
    @Inject(IOrganizationRepository)
    private organizationRepository: IOrganizationRepository,
  ) {}

  public async handler(id: number): Promise<void> {
    const organziation = await this.organizationRepository.findOneBy({ id });

    if (!organziation) {
      throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);
    }

    await this.organizationRepository.delete(id);
  }
}
