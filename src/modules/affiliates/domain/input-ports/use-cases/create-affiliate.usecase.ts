import { Inject, HttpException, HttpStatus } from '@nestjs/common';

//Dto
import { AffiliateDto } from '../../../adapters/input/dto/affiliate.dto';

//Repository
import { IAffiliateRepository } from '../../output-ports/affiliate.repository';
import { IUserRepository } from '../../../../users/domain/output-ports/user.repository';

//Use case
import { ValidateAndAssignRelationsUsecase } from './validate-and-assign-relations.usecase';

//Entity
import { AffiliatesEntity } from '../../../../../common/entities/affiliate.entity';

export class CreateAffiliateUsecase {
  constructor(
    @Inject(IAffiliateRepository)
    private affiliateRepository: IAffiliateRepository,
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    private readonly validateAndAssignRelations: ValidateAndAssignRelationsUsecase,
  ) {}

  public async handler(affiliateDto: AffiliateDto): Promise<AffiliatesEntity> {
    //Si se proporciona `userId`, buscar el usuario en la base de datos.
    const user = await this.userRepository.findOneBy({
      id: affiliateDto.userId,
    });

    if (!user) {
      throw new HttpException(
        `User with ID ${affiliateDto.userId} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    //Crear afiliado y enlazarlo con el usuario existente
    const affiliate = new AffiliatesEntity({
      user,
      observations: affiliateDto.observations,
    });

    //Validar y asignar relaciones
    await this.validateAndAssignRelations.handler(affiliateDto, affiliate);

    //Guardar afiliado en la base de datos
    return await this.affiliateRepository.create(affiliate);
  }
}
