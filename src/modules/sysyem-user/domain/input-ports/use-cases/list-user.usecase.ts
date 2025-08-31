import { SystemUsersEntity } from '../../../../../common/entities/system-users.entity';
import { ISystemUserRepository } from '../../output-ports/system-user.repository';
import { Inject } from '@nestjs/common';

export class ListUserUsecase {
  constructor(
    @Inject(ISystemUserRepository)
    private systemUserRepository: ISystemUserRepository,
  ) {}

  public async handler(): Promise<SystemUsersEntity[]> {
    return await this.systemUserRepository.findAll();
  }

  public async getById(id) {
    return await this.systemUserRepository.getUser({ id });
  }
}
