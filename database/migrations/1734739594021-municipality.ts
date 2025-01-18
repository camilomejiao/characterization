import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Municipality1734739594021 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'municipalities',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'code',
            type: 'int',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'departmentId',
            type: 'int',
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ['departmentId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'departments',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }),
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('municipalities');
  }
}
