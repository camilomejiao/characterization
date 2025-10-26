import { Ips_primaryEntity } from '../../../../common/entities/ips_primary.entity';

export interface IIps_primaryRepository {
  findOneBy(id: Partial<Ips_primaryEntity>): Promise<Ips_primaryEntity>;
}
export const IIps_primaryRepository = Symbol('IIps_primaryRepository');
