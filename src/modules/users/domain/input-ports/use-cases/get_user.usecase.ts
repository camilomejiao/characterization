import { Inject, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../../output-ports/user.repository';
import { IIdentificationTypeRepository } from '../../../../common/domain/output-ports/identification_type.repository';

export class Get_userUsecase {
  constructor(
    @Inject(IIdentificationTypeRepository)
    private identificationTypeRepository: IIdentificationTypeRepository,
    @Inject(IUserRepository)
    private userRepository: IUserRepository,
  ) {}

  public async handler(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  public async userIdentification(identificationNumber: number) {
    const user = await this.userRepository.findOne({
      where: { identificationNumber },
      relations: {
        identificationType: true,
        disabilityType: true,
        department: true,
        municipality: true,
        sex: true,
        area: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  public async listAll() {
    return await this.userRepository.findAll();
  }
}
