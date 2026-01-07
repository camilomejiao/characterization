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
    try {
      const year = Number(period.slice(0, 4));
      const month = Number(period.slice(4, 6));

      const rec = repo.create({
        affiliate: { id: affiliateId },
        description: `LMA ${period}`,
        paid: Number(valorLMA).toFixed(2),
        month,
        year,
      });
      await repo.save(rec);
    } catch (error) {
      console.log(error);
    }
  }
}
