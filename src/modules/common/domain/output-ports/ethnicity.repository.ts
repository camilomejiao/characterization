import { EthnicityEntity } from '../../../../common/entities/ethnicity.entity';

export interface IEthnicityRepository {
  findOneBy(id: Partial<EthnicityEntity>): Promise<EthnicityEntity>;
}
export const IEthnicityRepository = Symbol('IEthnicityRepository');
