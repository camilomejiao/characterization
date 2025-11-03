import { Inject } from '@nestjs/common';
import { IOrganizationRepository } from '../../output-ports/organization.repository';
import { OrganizationEntity } from '../../../../../common/entities/organization.entity';

export class ListOrganizationUsecase {
  constructor(
    @Inject(IOrganizationRepository)
    private organizationRepository: IOrganizationRepository,
  ) {}

  public async handler(): Promise<OrganizationEntity[]> {
    return await this.organizationRepository.findAll();
  }

  public async getById(id) {
    return await this.organizationRepository.getOrganization({ id });
  }
}
