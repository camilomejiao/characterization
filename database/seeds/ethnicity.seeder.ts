import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { EthnicityEntity } from '../../src/common/entities/ethnicity.entity';

export class EthnicitySeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(EthnicityEntity);

    const regs = [
      { id: 1, name: 'Indigena' },
      { id: 2, name: 'ROM(Gitano)' },
      { id: 3, name: 'Raizal(Archipielago San Andrés y Providencia)' },
      { id: 4, name: 'Palenquero de SanBasilio' },
      {
        id: 5,
        name: 'Negro(a) o mulato(a) o afrocolombiano(a) o afrodescendiente',
      },
      { id: 6, name: 'Otras etnias' },
      { id: 7, name: 'Ninguna' },
    ];

    for (const data of regs) {
      const level = await repository.findOneBy({ id: data.id });

      if (!level) {
        await repository.insert([data]);
      }
    }
  }
}
