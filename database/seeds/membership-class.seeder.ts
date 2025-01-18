import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { MembershipClassEntity } from '../../src/common/entities/membership-class.entity';

export class MembershipClassSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(MembershipClassEntity);

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
