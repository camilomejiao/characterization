import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AffiliatedStated1747356816710 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'affiliated_state',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'cod',
            type: 'varchar',
            length: '10',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
        ],
        foreignKeys: [],
        indices: [],
        engine: 'InnoDB',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('affiliated_state');
  }
}
