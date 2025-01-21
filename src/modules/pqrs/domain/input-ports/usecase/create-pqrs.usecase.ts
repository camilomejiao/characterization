import { Inject } from '@nestjs/common';
import { CreatePqrsDto } from '../../../adapter/input/dto/pqrs.dto';
import { IPqrsRepository } from '../../output-ports/pqrs.repository';
import { PqrsEntity } from '../../../../../common/entities/pqrs.entity';
import { ValidateAndAssignRelationsUsecase } from './validate-and-assign-relations.usecase';

export class CreatePqrsUsecase {
  constructor(
    @Inject(IPqrsRepository)
    private readonly pqrsRepository: IPqrsRepository,
    private readonly validateAndAssignRelations: ValidateAndAssignRelationsUsecase,
  ) {}

  public async handler(pqrsDto: CreatePqrsDto): Promise<PqrsEntity> {
    const pqrs = new PqrsEntity({
      reason: pqrsDto.reason,
      entity: pqrsDto.entity,
      responsible: pqrsDto.responsible,
      dateOfEvents: pqrsDto.dateOfEvents,
      descriptionOfEvents: pqrsDto.descriptionOfEvents,
      address: pqrsDto.address,
    });

    // Validar y asignar relaciones
    await this.validateAndAssignRelations.handler(pqrsDto, pqrs);

    // Guardar la entidad en la base de datos
    return await this.pqrsRepository.create(pqrs);
  }
}
