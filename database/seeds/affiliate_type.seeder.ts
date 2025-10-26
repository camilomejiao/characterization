import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Affiliate_typeEntity } from '../../src/common/entities/affiliate_type.entity';

export class AffiliateTypeSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Affiliate_typeEntity);

    const regs = [
      { id: 1, name: 'Adicional' },
      { id: 2, name: 'Beneficiario o asegurado' },
      { id: 3, name: 'Cabeza de familia' },
    ];

    for (const data of regs) {
      const affiliateType = await repository.findOneBy({ id: data.id });

      if (!affiliateType) {
        await repository.insert([data]);
      }
    }
  }
}
