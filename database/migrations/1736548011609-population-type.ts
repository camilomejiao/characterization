import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class PopulationType1736548011609 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'population-type',
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
            length: '250',
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
    await queryRunner.dropTable('population-type');
  }
}
