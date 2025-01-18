import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { IdentificationTypeEntity } from '../../src/common/entities/identification-type.entity';

export class IdentificationTypeSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(IdentificationTypeEntity);

    const regs = [
      { id: 1, acronym: 'AS', name: 'Adulto sin Registrar' },
      { id: 2, acronym: 'CC', name: 'Cédula Ciudadanía' },
      { id: 3, acronym: 'CD', name: 'Carnet Diplomático' },
      { id: 4, acronym: 'CE', name: 'Cédula de Extranjeria' },
      { id: 5, acronym: 'CN', name: 'Certificado de Nacido Vivo' },
      { id: 6, acronym: 'MS', name: 'Menor sin Identificación' },
      { id: 7, acronym: 'NV', name: 'Certificado Nacido Vivo' },
      { id: 8, acronym: 'PA', name: 'Pasaporte' },
      { id: 9, acronym: 'PE', name: 'Permiso Especial de Permanencia' },
      { id: 10, acronym: 'PR', name: 'Pasaporte Refugiados' },
      { id: 11, acronym: 'RC', name: 'Registro Civil' },
      { id: 12, acronym: 'SC', name: 'Salvo Conducto' },
      { id: 13, acronym: 'TI', name: 'Tarjeta de Identidad' },
    ];

    for (const data of regs) {
      const identificationType = await repository.findOneBy({ id: data.id });

      if (!identificationType) {
        await repository.insert([data]);
      }
    }
  }
}
