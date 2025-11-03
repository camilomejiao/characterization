import { EntityManager } from 'typeorm';
import { Affiliate_historyEntity } from '../../../../../../common/entities/affiliate_history.entity';

export class AffiliateHistoryUsecase {
  constructor() {}

  public async handler(
    manager: EntityManager,
    affiliateId: number,
    description: string,
  ) {
    const repo = manager.getRepository(Affiliate_historyEntity);
    const h = repo.create({
      affiliate: { id: affiliateId } as any,
      description,
    });
    await repo.save(h);
  }
}
