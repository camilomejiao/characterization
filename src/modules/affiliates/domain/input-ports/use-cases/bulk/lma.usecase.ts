import { EntityManager } from 'typeorm';
import { LMAEntity } from '../../../../../../common/entities/lma.entity';

export class LmaUsecase {
  constructor() {}

  public async handler(
    manager: EntityManager,
    affiliateId: number,
    period: string,
    valorLMA: number,
  ) {
    const repo = manager.getRepository(LMAEntity);
    const rec = repo.create({
      affiliate: { id: affiliateId } as any,
      description: `LMA ${period}`,
      paid: String(valorLMA), // idealmente amount decimal
    });
    await repo.save(rec);
  }
}
