import { ApplicationStatusEntity } from '../../../../common/entities/application-status.entity';

export interface IApplicationStatusRepository {
  findOneBy(
    id: Partial<ApplicationStatusEntity>,
  ): Promise<ApplicationStatusEntity>;
}
export const IApplicationStatusRepository = Symbol(
  'IApplicationStatusRepository',
);
