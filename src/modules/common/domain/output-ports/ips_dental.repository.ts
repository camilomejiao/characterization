import { Ips_dentalEntity } from '../../../../common/entities/ips_dental.entity';

export interface IIps_dentalRepository {
  findOneBy(id: Partial<Ips_dentalEntity>): Promise<Ips_dentalEntity>;
}
export const IIps_dentalRepository = Symbol('IIps_dentalRepository');
