import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Role } from '../../src/common/entities/role.entity';

export class RolesSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Role);

    const regs = [
      {
        id: 1,
        name: 'SUPER_ADMIN',
        is_active: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
      },
      {
        id: 2,
        name: 'ADMIN_FILE',
        is_active: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
      },
    ];

    for (const data of regs) {
      const roles = await repository.findOneBy({ id: data.id });

      if (!roles) {
        await repository.insert([data]);
      }
    }
  }
}
