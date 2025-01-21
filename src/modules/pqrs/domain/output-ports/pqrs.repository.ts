import { PqrsEntity } from '../../../../common/entities/pqrs.entity';

export interface IPqrsRepository {
  create(entity: PqrsEntity): Promise<PqrsEntity>;

  findOneBy(condition: Partial<PqrsEntity>): Promise<PqrsEntity>;

  findByAffiliateIdentification(
    identificationNumber: number,
  ): Promise<PqrsEntity[]>;

  update(entity: PqrsEntity): Promise<PqrsEntity>;
}

export const IPqrsRepository = Symbol('IPqrsRepository');
