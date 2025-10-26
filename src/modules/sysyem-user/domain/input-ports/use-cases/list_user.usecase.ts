import { System_usersEntity } from '../../../../../common/entities/system_users.entity';
import { ISystemUserRepository } from '../../output-ports/system_user.repository';
import { Inject } from '@nestjs/common';

export class List_userUsecase {
  constructor(
    @Inject(ISystemUserRepository)
    private systemUserRepository: ISystemUserRepository,
  ) {}

  public async handler(): Promise<System_usersEntity[]> {
    return await this.systemUserRepository.findAll();
  }

  public async getById(id) {
    return await this.systemUserRepository.getUser({ id });
  }
}
