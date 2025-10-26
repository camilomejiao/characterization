import { Inject } from '@nestjs/common';

//Dto
import { CreatePqrsDto } from '../../../adapter/input/dto/pqrs.dto';

//Entity
import { PqrsEntity } from '../../../../../common/entities/pqrs.entity';
import { System_usersEntity } from '../../../../../common/entities/system_users.entity';

//Use Case
import { Validate_and_assign_relationsUsecase } from './validate_and_assign_relations.usecase';

//Interface
import { IPqrsRepository } from '../../output-ports/pqrs.repository';
import { IFileSigningPortRepository } from '../../output-ports/s3/file-signing.port.repository';

//Adapter
import { S3FileStorageAdapter } from '../../../adapter/output/s3/s3-file-storage.adapter';

export class Create_pqrsUsecase {
  constructor(
    @Inject(IPqrsRepository)
    private readonly pqrsRepository: IPqrsRepository,
    @Inject(IFileSigningPortRepository)
    private readonly storage: S3FileStorageAdapter,
    private readonly validateAndAssignRelations: Validate_and_assign_relationsUsecase,
  ) {}

  public async handler(
    pqrsDto: CreatePqrsDto,
    file?: Express.Multer.File | null,
    userId?: number,
  ): Promise<PqrsEntity> {
    const pqrs = new PqrsEntity({
      entity: pqrsDto.entity,
      dateOfEvents: pqrsDto.dateOfEvents,
      descriptionOfEvents: pqrsDto.descriptionOfEvents,
    });

    if (file) {
      pqrs.files = await this.storage.upload(file);
    } else {
      pqrs.files = null;
    }

    // Validar y asignar relaciones
    await this.validateAndAssignRelations.handler(pqrsDto, pqrs);

    //Asignar el usuario del token
    pqrs.userSystem = { id: userId } as System_usersEntity;

    // Guardar la entidad en la base de datos
    return await this.pqrsRepository.create(pqrs);
  }
}
