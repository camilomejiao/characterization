import { HttpException, HttpStatus, Inject } from '@nestjs/common';
//Dto
import { UpdateDto } from '../../../adapters/input/dto/update.dto';
//Entity
import { SpecialPopulationEntity } from '../../../../../common/entities/special_population.entity';
//Interface
import { ISpecialPopulationRepository } from '../../output-ports/special_population.repository';
//Use case
import { Validate_and_assign_relationsUsecase } from './validate_and_assign_relations.usecase';

export class UpdateSpecialPopulationUsecase {
  constructor(
    @Inject(ISpecialPopulationRepository)
    private specialPopulationRepository: ISpecialPopulationRepository,
    private readonly validateAndAssignRelations: Validate_and_assign_relationsUsecase,
  ) {}

  public async handler(
    id: number,
    updateSpecialPopulationDto: UpdateDto,
  ): Promise<SpecialPopulationEntity> {
    try {
      const specialPopulationUser =
        await this.specialPopulationRepository.findById(id);

      if (!specialPopulationUser) {
        throw new HttpException(
          `User with ID ${id} not found.`,
          HttpStatus.NOT_FOUND,
        );
      }

      //Actualizar  sin sobrescribir valores previos
      const updateSpecialPopulationUser: Partial<SpecialPopulationEntity> = {};

      if (updateSpecialPopulationDto.hasEpsAffiliate !== undefined)
        updateSpecialPopulationUser.hasEpsAffiliate =
          updateSpecialPopulationDto.hasEpsAffiliate === 1 ? true : false;
      if (updateSpecialPopulationDto.observations !== undefined)
        updateSpecialPopulationUser.observations =
          updateSpecialPopulationDto.observations;

      await this.validateAndAssignRelations.handler(
        updateSpecialPopulationDto,
        specialPopulationUser,
      );

      //Si hay cambios en el afiliado, se actualiza
      if (Object.keys(updateSpecialPopulationUser).length > 0) {
        // Fusionar los datos existentes con los nuevos valores
        Object.assign(specialPopulationUser, updateSpecialPopulationUser);

        return await this.specialPopulationRepository.update(
          specialPopulationUser,
        );
      }

      return specialPopulationUser;
    } catch (error) {
      console.log(error);
    }
  }
}
