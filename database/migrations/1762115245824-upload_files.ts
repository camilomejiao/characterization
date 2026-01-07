import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UploadFiles1762115245824 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'upload_files',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'organization_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'system_user_id',
            type: 'int',
            isNullable: false,
          },

          // metadata archivo
          {
            name: 'file_name',
            type: 'varchar',
            length: '200',
            isNullable: false,
          },

          // AAAAMM (el periodo del archivo, ej: 202512)
          {
            name: 'period',
            type: 'varchar',
            length: '6',
            isNullable: false,
          },

          // estado del proceso
          {
            name: 'status',
            type: 'enum',
            enum: ['PROCESSING', 'COMPLETED', 'FAILED'],
            isNullable: false,
            default: "'PROCESSING'",
          },
          {
            name: 'created_at',
            type: 'datetime(6)',
            default: 'CURRENT_TIMESTAMP(6)',
          },
          {
            name: 'updated_at',
            type: 'datetime(6)',
            default: 'CURRENT_TIMESTAMP(6)',
            onUpdate: 'CURRENT_TIMESTAMP(6)',
          },
          {
            name: 'deleted_at',
            type: 'datetime(6)',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['system_user_id'],
            referencedTableName: 'system_user',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['organization_id'],
            referencedTableName: 'organization',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
        indices: [],
        engine: 'InnoDB',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('upload_files');
  }
}
