import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class SpecialPopulation1761514443046 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'special_population',
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
            name: 'affiliated_state_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'has_eps_affiliate',
            type: 'tinyint',
            length: '1',
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
            columnNames: ['affiliated_state_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'affiliated_state',
            onDelete: 'SET NULL',
          },
        ],
        indices: [
          {
            name: 'IDX_SPECIAL_POPLATION_USER_ID',
            columnNames: ['user_id'],
            isUnique: true,
          },
        ],
        engine: 'InnoDB',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('special_population');
  }
}
