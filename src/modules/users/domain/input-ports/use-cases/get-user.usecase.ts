import { Inject } from '@nestjs/common';
import { IUserRepository } from '../../output-ports/user.repository';

export class GetUserUsecase {
  constructor(
    @Inject(IUserRepository)
    private userRepository: IUserRepository,
  ) {}

  public async handler(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  public async listAll() {
    return await this.userRepository.findAll();
  }
}
