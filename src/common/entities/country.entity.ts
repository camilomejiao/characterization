import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('countries')
export class CountryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  demonym: string;

  @Column()
  alpha_code: string;
}
