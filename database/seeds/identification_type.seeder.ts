import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Identification_typeEntity } from '../../src/common/entities/identification_type.entity';

export class Identification_typeSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Identification_typeEntity);

    const regs = [
      { id: 1, acronym: 'AS', name: 'Adulto sin Registrar' },
      { id: 2, acronym: 'CC', name: 'Cédula Ciudadanía' },
      { id: 3, acronym: 'CD', name: 'Carnet Diplomático' },
      { id: 4, acronym: 'CE', name: 'Cédula de Extranjeria' },
      { id: 5, acronym: 'CN', name: 'Certificado de Nacido Vivo' },
      { id: 6, acronym: 'PA', name: 'Pasaporte' },
      { id: 7, acronym: 'PE', name: 'Permiso Especial de Permanencia' },
      { id: 8, acronym: 'RC', name: 'Registro Civil' },
      { id: 9, acronym: 'SC', name: 'Salvo Conducto' },
      { id: 10, acronym: 'TI', name: 'Tarjeta de Identidad' },
      { id: 11, acronym: 'PT', name: 'Permiso de Protección Temporal' },
    ];

    for (const data of regs) {
      const identificationType = await repository.findOneBy({ id: data.id });

      if (!identificationType) {
        await repository.insert([data]);
      }
    }
  }
}
