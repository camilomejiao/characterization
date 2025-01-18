import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Level1736543554012 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'level',
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
    await queryRunner.dropTable('level');
  }
}
