import { Reason_pqrsEntity } from '../../../../common/entities/reason_pqrs.entity';

export interface IReasonPqrsRepository {
  findOneBy(id: Partial<Reason_pqrsEntity>): Promise<Reason_pqrsEntity>;
}
export const IReasonPqrsRepository = Symbol('IReasonPqrsRepository');
