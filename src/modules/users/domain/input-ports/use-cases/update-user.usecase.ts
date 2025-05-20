import { Inject } from '@nestjs/common';
import { UpdateUserDto } from '../../../adapters/input/dto/update-user.dto';
import { IUserRepository } from '../../output-ports/user.repository';

export class UpdateUserUsecase {
  constructor(
    @Inject(IUserRepository)
    private userRepository: IUserRepository,
  ) {}

  public async handler(id: number, userDto: UpdateUserDto) {
    return await this.userRepository.update(id, userDto);
  }
}
