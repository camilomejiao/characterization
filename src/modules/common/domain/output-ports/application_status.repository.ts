import { Application_statusEntity } from '../../../../common/entities/application_status.entity';

export interface IApplicationStatusRepository {
  findOneBy(
    id: Partial<Application_statusEntity>,
  ): Promise<Application_statusEntity>;
}
export const IApplicationStatusRepository = Symbol(
  'IApplicationStatusRepository',
);
