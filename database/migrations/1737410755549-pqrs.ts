import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Pqrs1737410755549 implements MigrationInterface {
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
            name: 'user_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'reason',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'entity',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'responsible',
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
            name: 'address',
            type: 'varchar',
            length: '255',
            isNullable: false,
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
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
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
            columnNames: ['user_id'],
            referencedTableName: 'affiliates',
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
