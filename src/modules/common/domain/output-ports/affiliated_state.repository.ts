import { Affiliated_stateEntity } from '../../../../common/entities/affiliated_state.entity';

export interface IAffiliatedStateRepository {
  findOneBy(
    id: Partial<Affiliated_stateEntity>,
  ): Promise<Affiliated_stateEntity>;
}

export const IAffiliatedStateRepository = Symbol('IAffiliatedStateRepository');
