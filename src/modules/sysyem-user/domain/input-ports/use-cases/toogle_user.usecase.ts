import { ISystemUserRepository } from '../../output-ports/system_user.repository';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { System_usersEntity } from '../../../../../common/entities/system_users.entity';

export class Toogle_userUsecase {
  constructor(
    @Inject(ISystemUserRepository)
    private systemUserRepository: ISystemUserRepository,
  ) {}

  public async handler(
    id: number,
    status: number,
  ): Promise<System_usersEntity> {
    const user = await this.systemUserRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return await this.systemUserRepository.toggleStatus(id, status);
  }
}
