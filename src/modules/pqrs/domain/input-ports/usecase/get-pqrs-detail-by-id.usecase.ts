import { Inject, NotFoundException } from '@nestjs/common';
import { IPqrsRepository } from '../../output-ports/pqrs.repository';
import { IFileSigningPortRepository } from '../../output-ports/s3/file-signing.port.repository';

export class GetPqrsDetailByIdUsecase {
  constructor(
    @Inject(IPqrsRepository) private readonly pqrsRepo: IPqrsRepository,
    @Inject(IFileSigningPortRepository)
    private readonly signer: IFileSigningPortRepository,
  ) {}

  public async handler(id: number) {
    const pqrs = await this.pqrsRepo.findOneBy({ id });
    if (!pqrs) throw new NotFoundException('PQRS not found');

    let fileUrl: string | null = null;
    if (pqrs.files) {
      fileUrl = await this.signer.getSignedUrl(pqrs.files, { expiresIn: 300 });
    }

    return { ...pqrs, fileUrl };
  }
}
