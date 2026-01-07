import { PqrsEntity } from '../../../../common/entities/pqrs.entity';

export interface IPqrsRepository {
  create(entity: PqrsEntity): Promise<PqrsEntity>;

  findOneBy(condition: Partial<PqrsEntity>): Promise<PqrsEntity>;

  findAll(): Promise<PqrsEntity[]>;

  findByAffiliateIdentification(
    identificationNumber: number,
  ): Promise<PqrsEntity[]>;

  update(entity: PqrsEntity): Promise<PqrsEntity>;

  delete(id: number);

  getInformationDetailExcel(startDate, endDate);
}

export const IPqrsRepository = Symbol('IPqrsRepository');
