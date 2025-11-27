import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Group_subgroupEntity } from '../../src/common/entities/group_subgroup.entity';

export class Group_subgroupSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Group_subgroupEntity);

    const regs = [
      { id: 1, subgroup: 'Ninguno', group: 'N' },
      { id: 2, subgroup: 'A01', group: 'A' },
      { id: 3, subgroup: 'A02', group: 'A' },
      { id: 4, subgroup: 'A03', group: 'A' },
      { id: 5, subgroup: 'A04', group: 'A' },
      { id: 6, subgroup: 'A05', group: 'A' },
      { id: 7, subgroup: 'B01', group: 'B' },
      { id: 8, subgroup: 'B02', group: 'B' },
      { id: 9, subgroup: 'B03', group: 'B' },
      { id: 10, subgroup: 'B04', group: 'B' },
      { id: 11, subgroup: 'B05', group: 'B' },
      { id: 12, subgroup: 'B06', group: 'B' },
      { id: 13, subgroup: 'B07', group: 'B' },
      { id: 14, subgroup: 'C01', group: 'C' },
      { id: 15, subgroup: 'C02', group: 'C' },
      { id: 16, subgroup: 'C03', group: 'C' },
      { id: 17, subgroup: 'C04', group: 'C' },
      { id: 18, subgroup: 'C05', group: 'C' },
      { id: 19, subgroup: 'C06', group: 'C' },
      { id: 20, subgroup: 'C07', group: 'C' },
      { id: 21, subgroup: 'C08', group: 'C' },
      { id: 22, subgroup: 'C09', group: 'C' },
      { id: 23, subgroup: 'C10', group: 'C' },
      { id: 24, subgroup: 'C11', group: 'C' },
      { id: 25, subgroup: 'C12', group: 'C' },
      { id: 26, subgroup: 'C13', group: 'C' },
      { id: 27, subgroup: 'C14', group: 'C' },
      { id: 28, subgroup: 'C15', group: 'C' },
      { id: 29, subgroup: 'C16', group: 'C' },
      { id: 30, subgroup: 'C17', group: 'C' },
      { id: 31, subgroup: 'C18', group: 'C' },
      { id: 32, subgroup: 'D01', group: 'D' },
      { id: 33, subgroup: 'D02', group: 'D' },
      { id: 34, subgroup: 'D03', group: 'D' },
      { id: 35, subgroup: 'D04', group: 'D' },
      { id: 36, subgroup: 'D05', group: 'D' },
      { id: 37, subgroup: 'D06', group: 'D' },
      { id: 38, subgroup: 'D07', group: 'D' },
      { id: 39, subgroup: 'D08', group: 'D' },
      { id: 40, subgroup: 'D09', group: 'D' },
      { id: 41, subgroup: 'D10', group: 'D' },
      { id: 42, subgroup: 'D11', group: 'D' },
      { id: 43, subgroup: 'D12', group: 'D' },
      { id: 44, subgroup: 'D13', group: 'D' },
      { id: 45, subgroup: 'D14', group: 'D' },
      { id: 46, subgroup: 'D15', group: 'D' },
      { id: 47, subgroup: 'D16', group: 'D' },
      { id: 48, subgroup: 'D17', group: 'D' },
      { id: 49, subgroup: 'D18', group: 'D' },
      { id: 50, subgroup: 'D19', group: 'D' },
      { id: 51, subgroup: 'D20', group: 'D' },
      { id: 52, subgroup: 'D21', group: 'D' },
    ];

    for (const data of regs) {
      const groupSubgroup = await repository.findOneBy({ id: data.id });

      if (!groupSubgroup) {
        await repository.insert([data]);
      }
    }
  }
}
