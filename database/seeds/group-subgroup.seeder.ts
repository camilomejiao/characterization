import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { GroupSubgroupEntity } from '../../src/common/entities/group-subgroup.entity';

export class GroupSubgroupSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(GroupSubgroupEntity);

    const regs = [
      { id: 1, subgroup: 'A01', group: 'Pobreza extrema' },
      { id: 2, subgroup: 'A02', group: 'Pobreza extrema' },
      { id: 3, subgroup: 'A03', group: 'Pobreza extrema' },
      { id: 4, subgroup: 'A04', group: 'Pobreza extrema' },
      { id: 5, subgroup: 'A05', group: 'Pobreza extrema' },
      { id: 6, subgroup: 'B01', group: 'Pobreza moderada' },
      { id: 7, subgroup: 'B02', group: 'Pobreza moderada' },
      { id: 8, subgroup: 'B03', group: 'Pobreza moderada' },
      { id: 9, subgroup: 'B04', group: 'Pobreza moderada' },
      { id: 10, subgroup: 'B05', group: 'Pobreza moderada' },
      { id: 11, subgroup: 'B06', group: 'Pobreza moderada' },
      { id: 12, subgroup: 'B07', group: 'Pobreza moderada' },
      { id: 13, subgroup: 'C01', group: 'Vulnerable' },
      { id: 14, subgroup: 'C02', group: 'Vulnerable' },
      { id: 15, subgroup: 'C03', group: 'Vulnerable' },
      { id: 16, subgroup: 'C04', group: 'Vulnerable' },
      { id: 17, subgroup: 'C05', group: 'Vulnerable' },
      { id: 18, subgroup: 'C06', group: 'Vulnerable' },
      { id: 19, subgroup: 'C07', group: 'Vulnerable' },
      { id: 20, subgroup: 'C08', group: 'Vulnerable' },
      { id: 21, subgroup: 'C09', group: 'Vulnerable' },
      { id: 22, subgroup: 'C10', group: 'Vulnerable' },
      { id: 23, subgroup: 'C11', group: 'Vulnerable' },
      { id: 24, subgroup: 'C12', group: 'Vulnerable' },
      { id: 25, subgroup: 'C13', group: 'Vulnerable' },
      { id: 26, subgroup: 'C14', group: 'Vulnerable' },
      { id: 27, subgroup: 'C15', group: 'Vulnerable' },
      { id: 28, subgroup: 'C16', group: 'Vulnerable' },
      { id: 29, subgroup: 'C17', group: 'Vulnerable' },
      { id: 30, subgroup: 'C18', group: 'Vulnerable' },
      { id: 31, subgroup: 'D01', group: 'No pobre, no vulnerable' },
      { id: 32, subgroup: 'D02', group: 'No pobre, no vulnerable' },
      { id: 33, subgroup: 'D03', group: 'No pobre, no vulnerable' },
      { id: 34, subgroup: 'D04', group: 'No pobre, no vulnerable' },
      { id: 35, subgroup: 'D05', group: 'No pobre, no vulnerable' },
      { id: 36, subgroup: 'D06', group: 'No pobre, no vulnerable' },
      { id: 37, subgroup: 'D07', group: 'No pobre, no vulnerable' },
      { id: 38, subgroup: 'D08', group: 'No pobre, no vulnerable' },
      { id: 39, subgroup: 'D09', group: 'No pobre, no vulnerable' },
      { id: 40, subgroup: 'D10', group: 'No pobre, no vulnerable' },
      { id: 41, subgroup: 'D11', group: 'No pobre, no vulnerable' },
      { id: 42, subgroup: 'D12', group: 'No pobre, no vulnerable' },
      { id: 43, subgroup: 'D13', group: 'No pobre, no vulnerable' },
      { id: 44, subgroup: 'D14', group: 'No pobre, no vulnerable' },
      { id: 45, subgroup: 'D15', group: 'No pobre, no vulnerable' },
      { id: 46, subgroup: 'D16', group: 'No pobre, no vulnerable' },
      { id: 47, subgroup: 'D17', group: 'No pobre, no vulnerable' },
      { id: 48, subgroup: 'D18', group: 'No pobre, no vulnerable' },
      { id: 49, subgroup: 'D19', group: 'No pobre, no vulnerable' },
      { id: 50, subgroup: 'D20', group: 'No pobre, no vulnerable' },
      { id: 51, subgroup: 'D21', group: 'No pobre, no vulnerable' },
    ];

    for (const data of regs) {
      const groupSubgroup = await repository.findOneBy({ id: data.id });

      if (!groupSubgroup) {
        await repository.insert([data]);
      }
    }
  }
}
