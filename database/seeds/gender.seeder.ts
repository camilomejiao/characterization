import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { GenderEntity } from '../../src/common/entities/gender.entity';

export class GenderSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(GenderEntity);

    const regs = [
      { id: 1, name: 'Femenino' },
      { id: 2, name: 'Masculino' },
    ];

    for (const data of regs) {
      const gender = await repository.findOneBy({ id: data.id });

      if (!gender) {
        await repository.insert([data]);
      }
    }
  }
}
