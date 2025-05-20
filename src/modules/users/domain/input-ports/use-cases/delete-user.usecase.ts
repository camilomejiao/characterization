import { Inject } from '@nestjs/common';
import { IUserRepository } from '../../output-ports/user.repository';

export class DeleteUserUsecase {
  constructor(
    @Inject(IUserRepository)
    private userRepository: IUserRepository,
  ) {}

  public async handler(id: number) {
    return await this.userRepository.delete(id);
  }
}
