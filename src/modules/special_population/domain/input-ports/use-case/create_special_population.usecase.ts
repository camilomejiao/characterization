import { HttpException, HttpStatus, Inject } from '@nestjs/common';

//Entity
import { SpecialPopulationEntity } from '../../../../../common/entities/special_population.entity';

//Interface
import { IUserRepository } from '../../../../users/domain/output-ports/user.repository';
import { ISpecialPopulationRepository } from '../../output-ports/special_population.repository';

//Dto
import { CreateDto } from '../../../adapters/input/dto/create.dto';

//Use case
import { Validate_and_assign_relationsUsecase } from './validate_and_assign_relations.usecase';

export class CreateSpecialPopulationUsecase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(ISpecialPopulationRepository)
    private specialPopulationRepository: ISpecialPopulationRepository,
    private readonly validateAndAssignRelations: Validate_and_assign_relationsUsecase,
  ) {}

  public async handler(
    specialPopulationDto: CreateDto,
  ): Promise<SpecialPopulationEntity> {
    try {
      const user = await this.userRepository.findOneBy({
        id: specialPopulationDto.userId,
      });

      if (!user) {
        throw new HttpException(
          `User with ID ${specialPopulationDto.userId} not found.`,
          HttpStatus.NOT_FOUND,
        );
      }

      const userToCreate = new SpecialPopulationEntity({
        user,
        hasEpsAffiliate:
          specialPopulationDto.hasEpsAffiliate === 1 ? true : false,
        observations: specialPopulationDto.observations,
      });

      await this.validateAndAssignRelations.handler(
        specialPopulationDto,
        userToCreate,
      );

      return await this.specialPopulationRepository.create(userToCreate);
    } catch (error) {
      console.log(error);
    }
  }
}
