import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Affiliate1747358665552 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'affiliates',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'regime_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'population_type_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'eps_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'ips_primary_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'ips_dental_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'affiliated_state_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'affiliate_type_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'methodology_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'level_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'membership_class_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'group_subgroup_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'sisben_number',
            type: 'varchar',
            length: '25',
            isNullable: true,
          },
          {
            name: 'form_number',
            type: 'varchar',
            length: '25',
            isNullable: true,
          },
          {
            name: 'observations',
            type: 'varchar',
            length: '200',
            isNullable: true,
          },
          {
            name: 'date_of_affiliated',
            type: 'date',
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
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['regime_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'regime',
            onDelete: 'RESTRICT',
          },
          {
            columnNames: ['population_type_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'population_type',
            onDelete: 'SET NULL',
          },
          {
            columnNames: ['eps_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'eps',
            onDelete: 'SET NULL',
          },
          {
            columnNames: ['ips_primary_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'ips_primary',
            onDelete: 'SET NULL',
          },
          {
            columnNames: ['ips_dental_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'ips_dental',
            onDelete: 'SET NULL',
          },
          {
            columnNames: ['affiliated_state_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'affiliated_state',
            onDelete: 'SET NULL',
          },
          {
            columnNames: ['affiliate_type_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'affiliate_type',
            onDelete: 'SET NULL',
          },
          {
            columnNames: ['methodology_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'methodology',
            onDelete: 'SET NULL',
          },
          {
            columnNames: ['level_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'level',
            onDelete: 'SET NULL',
          },
          {
            columnNames: ['membership_class_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'membership_class',
            onDelete: 'SET NULL',
          },
          {
            columnNames: ['group_subgroup_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'group_subgroup',
            onDelete: 'SET NULL',
          },
        ],
        indices: [
          {
            name: 'IDX_AFFILIATES_USER_ID',
            columnNames: ['user_id'],
            isUnique: true,
          },
        ],
        engine: 'InnoDB',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('affiliates');
  }
}
