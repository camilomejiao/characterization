import { Inject, HttpException, HttpStatus } from '@nestjs/common';

//Dto
import { AffiliateDto } from '../../../adapters/input/dto/affiliate.dto';

//Repository
import { IAffiliateRepository } from '../../output-ports/affiliate.repository';
import { IUserRepository } from '../../../../users/domain/output-ports/user.repository';

//Use case
import { Validate_and_assign_relationsUsecase } from './validate_and_assign_relations.usecase';

//Entity
import { AffiliatesEntity } from '../../../../../common/entities/affiliate.entity';

export class Create_affiliateUsecase {
  constructor(
    @Inject(IAffiliateRepository)
    private affiliateRepository: IAffiliateRepository,
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    private readonly validateAndAssignRelations: Validate_and_assign_relationsUsecase,
  ) {}

  public async handler(affiliateDto: AffiliateDto): Promise<AffiliatesEntity> {
    try {
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
        formNumber: affiliateDto.formNumber,
        dateOfAffiliated: affiliateDto.dateOfAffiliated,
        sisbenNumber: affiliateDto.sisbenNumber,
        observations: affiliateDto.observations,
      });

      //Validar y asignar relaciones
      await this.validateAndAssignRelations.handler(affiliateDto, affiliate);

      //Guardar afiliado en la base de datos
      return await this.affiliateRepository.create(affiliate);
    } catch (error) {
      console.log(error);
    }
  }
}
