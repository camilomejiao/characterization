import { ISystemUserRepository } from '../../output-ports/system-user.repository';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { SystemUsersEntity } from '../../../../../common/entities/system-users.entity';

export class ToogleUserUsecase {
  constructor(
    @Inject(ISystemUserRepository)
    private systemUserRepository: ISystemUserRepository,
  ) {}

  public async handler(id: number, status: number): Promise<SystemUsersEntity> {
    const user = await this.systemUserRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return await this.systemUserRepository.toggleStatus(id, status);
  }
}
