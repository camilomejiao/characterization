import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Affiliates1737233554161 implements MigrationInterface {
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
            name: 'identification_type_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'identification_number',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'population_type_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'eps_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'disability_type_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'gender_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'affiliate_type_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'area_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'methodology_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'level_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'membership_class_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'ethnicity_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'community_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'group_subgroup_id',
            type: 'int',
            isNullable: false,
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
            name: 'sisben_score',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'sisben_registration_date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'high_cost',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'features_survival',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'namesake',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'observations',
            type: 'varchar',
            length: '200',
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
            referencedColumnNames: ['id'],
            referencedTableName: 'departments',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['municipality_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'municipalities',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['identification_type_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'identification_type',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['population_type_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'population_type',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['eps_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'eps',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['disability_type_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'disability_type',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['gender_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'gender',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['affiliate_type_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'affiliate_type',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['area_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'area',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['methodology_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'methodology',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['level_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'level',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['membership_class_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'membership_class',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['ethnicity_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'ethnicity',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['community_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'community',
            onDelete: 'CASCADE',
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
    await queryRunner.dropTable('affiliates');
  }
}
