import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class GroupSubgroup1736544939934 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'group-subgroup',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'subgroup',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'group',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
        ],
        foreignKeys: [],
        indices: [],
        engine: 'InnoDB',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('group-subgroup');
  }
}
