import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { GenderEntity } from '../../src/common/entities/gender.entity';

export class GenderSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(GenderEntity);

    const regs = [
      { id: 1, name: 'Heterosexual' },
      { id: 2, name: 'Homosexual' },
      { id: 3, name: 'Bisexualidad' },
      { id: 4, name: 'Pansexual' },
      { id: 5, name: 'Cisgénero' },
      { id: 6, name: 'Transgénero' },
      { id: 7, name: 'No binario' },
      { id: 8, name: 'Intersexual' },
      { id: 9, name: 'Género fluido' },
      { id: 10, name: 'No conforme' },
    ];

    for (const data of regs) {
      const gender = await repository.findOneBy({ id: data.id });

      if (!gender) {
        await repository.insert([data]);
      }
    }
  }
}
