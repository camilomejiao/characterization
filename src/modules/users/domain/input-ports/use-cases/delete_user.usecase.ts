import { Inject } from '@nestjs/common';
import { IUserRepository } from '../../output-ports/user.repository';

export class Delete_userUsecase {
  constructor(
    @Inject(IUserRepository)
    private userRepository: IUserRepository,
  ) {}

  public async handler(id: number) {
    return await this.userRepository.delete(id);
  }
}
