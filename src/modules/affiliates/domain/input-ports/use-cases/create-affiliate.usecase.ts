import { Inject } from '@nestjs/common';
import { AffiliatesEntity } from '../../../../../common/entities/affiliate.entity';
import { AffiliateDto } from '../../../adapters/input/dto/affiliate.dto';
import { IAffiliateRepository } from '../../output-ports/affiliate.repository';
import { ValidateAndAssignRelationsUsecase } from './validate-and-assign-relations.usecase';

export class CreateAffiliateUsecase {
  constructor(
    @Inject(IAffiliateRepository)
    private affiliateRepository: IAffiliateRepository,
    private readonly validateAndAssignRelations: ValidateAndAssignRelationsUsecase,
  ) {}

  public async handler(affiliateDto: AffiliateDto): Promise<AffiliatesEntity> {
    // Crear una instancia base de la entidad
    const affiliate = new AffiliatesEntity({
      firstName: affiliateDto.firstName,
      middleName: affiliateDto.middleName,
      firstLastName: affiliateDto.firstLastName,
      middleLastName: affiliateDto.middleLastName,
      identificationNumber: affiliateDto.identificationNumber,
      birthdate: affiliateDto.birthdate,
      email: affiliateDto.email,
      phoneNumber: affiliateDto.phoneNumber,
      neighborhood: affiliateDto.neighborhood,
      address: affiliateDto.address,
      sisbenScore: affiliateDto.sisbenScore,
      sisbenRegistrationDate: affiliateDto.sisbenRegistrationDate,
      highCost: affiliateDto.highCost,
      featuresSurvival: affiliateDto.featuresSurvival,
      namesake: affiliateDto.namesake,
      observations: affiliateDto.observations,
    });

    // Validar y asignar relaciones
    await this.validateAndAssignRelations.handler(affiliateDto, affiliate);

    // Guardar en la base de datos
    return await this.affiliateRepository.create(affiliate);
  }
}
