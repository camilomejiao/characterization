import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Ips_dentalEntity } from '../../src/common/entities/ips_dental.entity';

export class IpsDentalSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Ips_dentalEntity);

    const regs = [
      {
        id: 1,
        name: 'EMPRESA SOCIAL DEL ESTADO HOSPITAL DIOGENES TRONCOSO DE PUERTO SALGAR',
      },
    ];

    for (const data of regs) {
      const sex = await repository.findOneBy({ id: data.id });

      if (!sex) {
        await repository.insert([data]);
      }
    }
  }
}
