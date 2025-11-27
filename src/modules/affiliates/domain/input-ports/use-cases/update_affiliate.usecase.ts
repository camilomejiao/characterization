import { Inject, HttpException, HttpStatus } from '@nestjs/common';

//Entity
import { AffiliatesEntity } from '../../../../../common/entities/affiliate.entity';
//Dto
import { AffiliateDto } from '../../../adapters/input/dto/affiliate.dto';
//Use Case
import { Validate_and_assign_relationsUsecase } from './validate_and_assign_relations.usecase';
//Repository
import { IAffiliateRepository } from '../../output-ports/affiliate.repository';
import { IUserRepository } from '../../../../users/domain/output-ports/user.repository';

export class Update_affiliateUsecase {
  constructor(
    @Inject(IAffiliateRepository)
    private readonly affiliateRepository: IAffiliateRepository,
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    private readonly validateAndAssignRelations: Validate_and_assign_relationsUsecase,
  ) {}

  public async handler(
    id: number,
    updateAffiliateDto: AffiliateDto,
  ): Promise<AffiliatesEntity> {
    try {
      //Buscar afiliado asociado al usuario
      const affiliate = await this.affiliateRepository.findById(id);

      if (!affiliate) {
        throw new HttpException(
          `Affiliate not found for User ID ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }

      //Actualizar sin sobrescribir valores previos
      const updateAffiliateData: Partial<AffiliatesEntity> = {};

      if (updateAffiliateDto.formNumber !== undefined)
        updateAffiliateData.formNumber = updateAffiliateDto.formNumber;
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
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
