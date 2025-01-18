import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Department1734739569003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'departments',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'code',
            type: 'int',
            isUnique: true,
          },
        ],
        foreignKeys: [],
        indices: [
          {
            name: 'data_unique',
            columnNames: ['code'],
            isUnique: true,
          },
        ],
        engine: 'InnoDB',
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('departments');
  }
}
