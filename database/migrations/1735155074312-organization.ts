import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Organization1735155074312 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'organization',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nit',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'department_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'municipality_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'file_1',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'file_2',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'file_3',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'file_4',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'tinyint',
            isNullable: false,
            default: 1,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
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
            columnNames: ['department_id'],
            referencedTableName: 'departments',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
          },
          {
            columnNames: ['municipality_id'],
            referencedTableName: 'municipalities',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
          },
        ],
        indices: [
          {
            name: 'data_unique',
            columnNames: ['nit'],
            isUnique: true,
          },
        ],
        engine: 'InnoDB',
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('organization');
  }
}
