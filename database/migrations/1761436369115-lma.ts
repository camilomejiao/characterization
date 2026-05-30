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
            type: 'decimal',
            precision: 14,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'month',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'year',
            type: 'int',
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
        indices: [
          {
            name: 'idx_lma_affiliate_id',
            columnNames: ['affiliate_id'],
            isUnique: false,
          },
        ],
        engine: 'InnoDB',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('lma');
  }
}
