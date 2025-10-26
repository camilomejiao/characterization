import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { RegimeEntity } from '../../src/common/entities/regime.entity';

export class RegimeSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(RegimeEntity);

    const regs = [
      {
        id: 1,
        name: 'SUBSIDIADO',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
      },
      {
        id: 2,
        name: 'CONTRIBUTIVO',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
      },
      {
        id: 3,
        name: 'REGIMEN ESPECIAL',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
      },
    ];

    for (const data of regs) {
      const roles = await repository.findOneBy({ id: data.id });

      if (!roles) {
        await repository.insert([data]);
      }
    }
  }
}
