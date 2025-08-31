import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Eps1735235455669 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'eps',
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
            length: '150',
            isNullable: false,
          },
          {
            name: 'nit',
            type: 'varchar',
            length: '25',
            isNullable: true,
          },
          {
            name: 'cod',
            type: 'varchar',
            length: '25',
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
    await queryRunner.dropTable('eps');
  }
}
