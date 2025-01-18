import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { MunicipalityEntity } from './municipality.entity';

@Entity('departments')
export class DepartmentEntity {
  @PrimaryColumn()
  public id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true, unique: true })
  code: number;

  @OneToMany(
    () => MunicipalityEntity,
    (municipality) => municipality.department,
  )
  municipalities: MunicipalityEntity[];
}
