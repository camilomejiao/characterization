import { ISystemUserRepository } from '../../output-ports/system_user.repository';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';

export class Delete_userUsecase {
  constructor(
    @Inject(ISystemUserRepository)
    private systemUserRepository: ISystemUserRepository,
  ) {}

  public async handler(id: number): Promise<void> {
    const user = await this.systemUserRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.systemUserRepository.delete(id);
  }
}
