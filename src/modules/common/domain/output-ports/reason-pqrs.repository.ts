import { ReasonPqrsEntity } from '../../../../common/entities/reason-pqrs.entity';

export interface IReasonPqrsRepository {
  findOneBy(id: Partial<ReasonPqrsEntity>): Promise<ReasonPqrsEntity>;
}
export const IReasonPqrsRepository = Symbol('IReasonPqrsRepository');
