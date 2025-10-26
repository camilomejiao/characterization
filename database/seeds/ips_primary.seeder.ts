import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Ips_primaryEntity } from '../../src/common/entities/ips_primary.entity';

export class IpsPrimarySeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Ips_primaryEntity);

    const regs = [{ id: 1, name: 'DIOGENES' }];

    for (const data of regs) {
      const sex = await repository.findOneBy({ id: data.id });

      if (!sex) {
        await repository.insert([data]);
      }
    }
  }
}
