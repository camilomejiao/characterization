import { Inject } from '@nestjs/common';
import { IPqrsRepository } from '../../output-ports/pqrs.repository';
import { UpdatePqrsDto } from '../../../adapter/input/dto/pqrs.dto';
import { ValidateAndAssignRelationsUsecase } from './validate-and-assign-relations.usecase';

export class UpdatePqrsUsecase {
  constructor(
    @Inject(IPqrsRepository)
    private readonly pqrsRepository: IPqrsRepository,
    private readonly validateAndAssignRelations: ValidateAndAssignRelationsUsecase,
  ) {}

  public async handler(id: number, updatePqrsDto: UpdatePqrsDto) {
    const pqrs = await this.pqrsRepository.findOneBy({ id });

    if (!pqrs) {
      throw new Error(`PQRS with ID ${id} not found`);
    }

    // Validar y asignar relaciones
    await this.validateAndAssignRelations.handler(updatePqrsDto, pqrs);

    // Asignar campos directos
    Object.assign(pqrs, updatePqrsDto);

    // Guardar los cambios
    return await this.pqrsRepository.update(pqrs);
  }
}
