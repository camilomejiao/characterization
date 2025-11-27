import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { EthnicityEntity } from '../../src/common/entities/ethnicity.entity';

export class EthnicitySeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(EthnicityEntity);

    const regs = [
      { id: 1, name: 'Ninguna' },
      { id: 2, name: 'Indigena' },
      { id: 3, name: 'ROM(Gitano)' },
      { id: 4, name: 'Raizal(Archipielago San Andrés y Providencia)' },
      { id: 5, name: 'Palenquero de SanBasilio' },
      {
        id: 6,
        name: 'Negro(a) o mulato(a) o afrocolombiano(a) o afrodescendiente',
      },
    ];

    for (const data of regs) {
      const level = await repository.findOneBy({ id: data.id });

      if (!level) {
        await repository.insert([data]);
      }
    }
  }
}
