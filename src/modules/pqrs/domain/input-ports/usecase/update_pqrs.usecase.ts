import { Inject } from '@nestjs/common';

//Dto
import { UpdatePqrsDto } from '../../../adapter/input/dto/pqrs.dto';

//Use Case
import { Validate_and_assign_relationsUsecase } from './validate_and_assign_relations.usecase';

//Interface
import { IPqrsRepository } from '../../output-ports/pqrs.repository';
import { IFileSigningPortRepository } from '../../output-ports/s3/file-signing.port.repository';

//Adapter
import { S3FileStorageAdapter } from '../../../adapter/output/s3/s3-file-storage.adapter';

export class Update_pqrsUsecase {
  constructor(
    @Inject(IPqrsRepository)
    private readonly pqrsRepository: IPqrsRepository,
    @Inject(IFileSigningPortRepository)
    private readonly storage: S3FileStorageAdapter,
    private readonly validateAndAssignRelations: Validate_and_assign_relationsUsecase,
  ) {}

  public async handler(
    id: number,
    updatePqrsDto: UpdatePqrsDto,
    file?: Express.Multer.File | null,
  ) {
    const pqrs = await this.pqrsRepository.findOneBy({ id });

    if (!pqrs) {
      throw new Error(`PQRS with ID ${id} not found`);
    }

    if (file) {
      pqrs.files = await this.storage.upload(file);
    }

    // Validar y asignar relaciones
    await this.validateAndAssignRelations.handler(updatePqrsDto, pqrs);

    // Asignar campos directos
    Object.assign(pqrs, updatePqrsDto);

    // Guardar los cambios
    return await this.pqrsRepository.update(pqrs);
  }
}
