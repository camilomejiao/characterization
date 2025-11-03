import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IOrganizationRepository } from '../../output-ports/organization.repository';
import { OrganizationEntity } from '../../../../../common/entities/organization.entity';

export class ToogleOrganizationUsecase {
  constructor(
    @Inject(IOrganizationRepository)
    private organizationRepository: IOrganizationRepository,
  ) {}

  public async handler(
    id: number,
    status: number,
  ): Promise<OrganizationEntity> {
    const organization = await this.organizationRepository.findOneBy({ id });

    if (!organization) {
      throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);
    }

    return await this.organizationRepository.toggleStatus(id, status);
  }
}
