import {
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IUserRepository } from '../../output-ports/user.repository';
import { IIdentificationTypeRepository } from '../../../../common/domain/output-ports/identification-type.repository';

export class GetUserUsecase {
  constructor(
    @Inject(IIdentificationTypeRepository)
    private identificationTypeRepository: IIdentificationTypeRepository,
    @Inject(IUserRepository)
    private userRepository: IUserRepository,
  ) {}

  public async handler(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  public async userIdentification(
    typeId: number,
    identificationNumber: number,
  ) {
    console.log(typeId, identificationNumber);
    const identificationType = await this.getIdentificationType(typeId);
    const user = await this.userRepository.findOne({
      where: { identificationType, identificationNumber },
      relations: [
        'identificationType',
        'disabilityType',
        'department',
        'municipality',
        'gender',
        'area',
      ],
    });

    console.log('user:', user);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  public async listAll() {
    return await this.userRepository.findAll();
  }

  //
  async getIdentificationType(identificationTypeId) {
    const identificationType =
      await this.identificationTypeRepository.findOneBy({
        id: identificationTypeId,
      });
    if (!identificationType)
      throw new NotFoundException(
        `Identification Type with ID ${identificationTypeId} not found`,
      );
    return identificationType;
  }
}
