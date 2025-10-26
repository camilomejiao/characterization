import { Inject, NotFoundException } from '@nestjs/common';
import { AffiliatesEntity } from '../../../../../common/entities/affiliate.entity';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../../../users/domain/output-ports/user.repository';
import { InjectRepository } from '@nestjs/typeorm';

export class Get_affiliate_by_identifiactionUsecase {
  constructor(
    @Inject(IUserRepository)
    private userRepository: IUserRepository,
    @InjectRepository(AffiliatesEntity)
    private affiliateRepository: Repository<AffiliatesEntity>,
  ) {}

  public async handler(
    identificationNumber: number,
  ): Promise<AffiliatesEntity> {
    //Buscar el usuario por número de identificación
    const user = await this.userRepository.findOneBy({
      identificationNumber: identificationNumber,
    });

    if (!user) {
      throw new NotFoundException(
        `User with identification number ${identificationNumber} not found`,
      );
    }

    //Buscar en afiliados con el user_id obtenido
    const affiliate = await this.affiliateRepository.findOne({
      where: { user: { id: user.id } },
      relations: [
        'user',
        'populationType',
        'eps',
        'affiliateType',
        'community',
        'ethnicity',
        'level',
        'membershipClass',
        'methodology',
        'groupSubgroup',
      ],
    });

    if (!affiliate) {
      throw new NotFoundException(
        `User with identification number ${identificationNumber} exists but is not an affiliate.`,
      );
    }

    return affiliate;
  }
}
