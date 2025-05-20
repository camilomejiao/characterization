import { Inject } from '@nestjs/common';
import { CreateUserDto } from '../../../adapters/input/dto/create-user.dto';
import { IUserRepository } from '../../output-ports/user.repository';
import { UserEntity } from '../../../../../common/entities/user.entity';

export class CreateUserUsecase {
  constructor(
    @Inject(IUserRepository)
    private userRepository: IUserRepository,
  ) {}

  public async handler(userDto: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity(userDto);
    return await this.userRepository.create(user);
  }
}
