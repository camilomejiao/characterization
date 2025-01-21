import { AffiliatesEntity } from '../../../../../common/entities/affiliate.entity';
import { IAffiliateRepository } from '../../output-ports/affiliate.repository';
import { UpdateAffiliateDto } from '../../../adapters/input/dto/update-affiliate.dto';
import { Inject } from '@nestjs/common';
import { ValidateAndAssignRelationsUsecase } from './validate-and-assign-relations.usecase';

export class UpdateAffiliateUsecase {
  constructor(
    @Inject(IAffiliateRepository)
    private affiliateRepository: IAffiliateRepository,
    private readonly validateAndAssignRelations: ValidateAndAssignRelationsUsecase,
  ) {}

  public async handler(
    id: number,
    updateAffiliateDto: UpdateAffiliateDto,
  ): Promise<AffiliatesEntity> {
    // Buscar el afiliado existente
    const affiliate = await this.affiliateRepository.findOneBy({ id });
    if (!affiliate) {
      throw new Error(`Affiliate with ID ${id} not found`);
    }

    // Validar y asignar relaciones
    await this.validateAndAssignRelations.handler(
      updateAffiliateDto,
      affiliate,
    );

    // Asignar campos directos
    Object.assign(affiliate, updateAffiliateDto);

    console.log('affiliate2: ', affiliate);

    //Guardar los cambios
    return await this.affiliateRepository.update(affiliate);
  }
}
