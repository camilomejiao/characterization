import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Users1738695404689 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
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
            name: 'identification_type_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'identification_number',
            type: 'bigint',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'disability_type_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'sex_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'area_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'country_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'ethnicity_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'first_name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'middle_name',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'first_last_name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'middle_last_name',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'birthdate',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '150',
            isNullable: true,
          },
          {
            name: 'phone_number',
            type: 'varchar',
            length: '20',
            isNullable: true,
          },
          {
            name: 'neighborhood',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'address',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'organization_id',
            type: 'int',
            isNullable: true,
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
            columnNames: ['country_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'countries',
            onDelete: 'SET NULL',
          },
          {
            columnNames: ['department_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'departments',
            onDelete: 'SET NULL',
          },
          {
            columnNames: ['municipality_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'municipalities',
            onDelete: 'SET NULL',
          },
          {
            columnNames: ['identification_type_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'identification_type',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['disability_type_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'disability_type',
            onDelete: 'SET NULL',
          },
          {
            columnNames: ['sex_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'sex',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['area_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'area',
            onDelete: 'SET NULL',
          },
          {
            columnNames: ['organization_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'organization',
            onDelete: 'SET NULL',
          },
          {
            columnNames: ['ethnicity_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'ethnicity',
            onDelete: 'SET NULL',
          },
        ],
        indices: [
          {
            name: 'IDX_IDENTIFICATION_NUMBER',
            columnNames: ['identification_number'],
            isUnique: true,
          },
        ],
        engine: 'InnoDB',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
