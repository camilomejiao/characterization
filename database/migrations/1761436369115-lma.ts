import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Lma1761436369115 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'lma',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'affiliate_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'paid',
            type: 'int',
            length: '10',
            isNullable: false,
          },
          {
            name: 'month',
            type: 'int',
            length: '3',
            isNullable: false,
          },
          {
            name: 'year',
            type: 'int',
            length: '5',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted_at',
            type: 'datetime',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['affiliate_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'affiliates',
            onDelete: 'RESTRICT',
          },
        ],
        indices: [],
        engine: 'InnoDB',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('lma');
  }
}
