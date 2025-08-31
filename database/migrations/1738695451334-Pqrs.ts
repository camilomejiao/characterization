import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Pqrs1738695451334 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pqrs',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'pqrs_type_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'application_status_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'department_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'municipality_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'reason_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'eps_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'entity',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'date_of_events',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'description_of_events',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'files',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'user_system_id',
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
            columnNames: ['pqrs_type_id'],
            referencedTableName: 'pqrs_type',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['application_status_id'],
            referencedTableName: 'application_status',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['department_id'],
            referencedTableName: 'departments',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['municipality_id'],
            referencedTableName: 'municipalities',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['reason_id'],
            referencedTableName: 'reason',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['eps_id'],
            referencedTableName: 'eps',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['user_system_id'],
            referencedTableName: 'system_user',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
        indices: [
          {
            name: 'IDX_PQRS_TYPE_ID',
            columnNames: ['pqrs_type_id'],
          },
          {
            name: 'IDX_APPLICATION_STATUS_ID',
            columnNames: ['application_status_id'],
          },
          {
            name: 'IDX_DEPARTMENT_ID',
            columnNames: ['department_id'],
          },
          {
            name: 'IDX_MUNICIPALITY_ID',
            columnNames: ['municipality_id'],
          },
          {
            name: 'IDX_USER_ID',
            columnNames: ['user_id'],
          },
        ],
        engine: 'InnoDB',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pqrs');
  }
}
