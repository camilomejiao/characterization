import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { AffiliatesEntity } from '../../../../../common/entities/affiliate.entity';
import { IAffiliateRepository } from '../../output-ports/affiliate.repository';
import { IUserRepository } from '../../../../users/domain/output-ports/user.repository';
import { ValidateAndAssignRelationsUsecase } from './validate-and-assign-relations.usecase';
import { AffiliateDto } from '../../../adapters/input/dto/affiliate.dto';

export class UpdateAffiliateUsecase {
  constructor(
    @Inject(IAffiliateRepository)
    private readonly affiliateRepository: IAffiliateRepository,
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    private readonly validateAndAssignRelations: ValidateAndAssignRelationsUsecase,
  ) {}

  public async handler(
    id: number,
    updateAffiliateDto: AffiliateDto,
  ): Promise<AffiliatesEntity> {
    //Buscar afiliado asociado al usuario
    const affiliate = await this.affiliateRepository.findById(id);

    if (!affiliate) {
      throw new HttpException(
        `Affiliate not found for User ID ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    //Actualizar afiliado sin sobrescribir valores previos
    const updateAffiliateData: Partial<AffiliatesEntity> = {};

    if (updateAffiliateDto.sisbenNumber !== undefined)
      updateAffiliateData.sisbenNumber = updateAffiliateDto.sisbenNumber;
    if (updateAffiliateDto.observations !== undefined)
      updateAffiliateData.observations = updateAffiliateDto.observations;
    if (updateAffiliateDto.dateOfAffiliated !== undefined)
      updateAffiliateData.dateOfAffiliated =
        updateAffiliateDto.dateOfAffiliated;

    //Validar y asignar relaciones nuevamente si hay cambios
    await this.validateAndAssignRelations.handler(
      updateAffiliateDto,
      affiliate,
    );

    //Si hay cambios en el afiliado, se actualiza
    if (Object.keys(updateAffiliateData).length > 0) {
      // Fusionar los datos existentes con los nuevos valores
      Object.assign(affiliate, updateAffiliateData);

      return await this.affiliateRepository.update(affiliate);
    }

    return affiliate;
  }
}
