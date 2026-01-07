import { AffiliatesEntity } from '../../../../common/entities/affiliate.entity';
import { UserEntity } from '../../../../common/entities/user.entity';

export interface IAffiliateRepository {
  create(entity: AffiliatesEntity): Promise<AffiliatesEntity>;

  findAll(): Promise<AffiliatesEntity[]>;

  findById(id): Promise<AffiliatesEntity>;

  findOneBy(condition: Partial<AffiliatesEntity>): Promise<AffiliatesEntity>;

  update(entity: AffiliatesEntity): Promise<AffiliatesEntity>;

  //
  findUserAndAffiliateByIdNumber(
    identificationNumber: number,
  ): Promise<UserEntity>;

  // 🔹 Bulk por muchos números (una sola consulta)
  findUsersAndAffiliatesByIdNumbers(
    organizationId: number,
    numbers: number[],
  ): Promise<
    Map<number, { user: UserEntity | null; affiliate: AffiliatesEntity | null }>
  >;

  reportInformationGrafics(
    month: number,
    year: number,
  ): Promise<{
    totalAffiliates: number;
    lmaAmount: number;
    byRegime: Record<string, number>;

    byEpsByRegime: Record<string, Record<string, number>>;
    byGenderByRegime: Record<string, Record<string, number>>;
    byAgeGroupByRegime: Record<string, Record<string, number>>;
    byPopulationTypeByRegime: Record<string, Record<string, number>>;
  }>;
}

export const IAffiliateRepository = Symbol('IAffiliateRepository');
