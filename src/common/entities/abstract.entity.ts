import { Exclude } from 'class-transformer';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class AbstractEntity<T> {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Exclude()
  public created_at: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Exclude()
  public updated_at: Date;

  @DeleteDateColumn({
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public deleted_at: Date;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
