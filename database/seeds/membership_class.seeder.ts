import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Membership_classEntity } from '../../src/common/entities/membership_class.entity';

export class Membership_classSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Membership_classEntity);

    const regs = [
      { id: 1, name: 'NACIMIENTO' },
      { id: 2, name: 'AFILIACION POR OFICIO ' },
      { id: 3, name: 'NUEVA AFILIACION' },
      { id: 4, name: 'AFILIACION CON CONTRIBUCION SOLIDARIA' },
      { id: 4, name: 'TRASLADO DE EPS' },
    ];

    for (const data of regs) {
      const membership = await repository.findOneBy({ id: data.id });

      if (!membership) {
        await repository.insert([data]);
      }
    }
  }
}
