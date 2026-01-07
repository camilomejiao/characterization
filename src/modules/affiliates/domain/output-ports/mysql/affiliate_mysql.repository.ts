import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { IAffiliateRepository } from '../affiliate.repository';
import { UserEntity } from '../../../../../common/entities/user.entity';
import { AffiliatesEntity } from '../../../../../common/entities/affiliate.entity';
import { LMAEntity } from '../../../../../common/entities/lma.entity';

@Injectable()
export class Affiliate_mysqlRepository implements IAffiliateRepository {
  constructor(
    @InjectRepository(AffiliatesEntity)
    private readonly repository: Repository<AffiliatesEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(entity: AffiliatesEntity): Promise<AffiliatesEntity> {
    return await this.entityManager.save(entity);
  }

  async findAll(): Promise<AffiliatesEntity[]> {
    return await this.repository.find({
      relations: {
        user: true,
        populationType: true,
        eps: true,
        affiliatedState: true,
        affiliateType: true,
        methodology: true,
        level: true,
        membershipClass: true,
        groupSubgroup: true,
        regime: true,
      },
      where: {
        affiliatedState: { id: 1 },
      },
    });
  }

  async findById(id: number): Promise<AffiliatesEntity> {
    return await this.repository.findOne({
      where: { id },
      relations: {
        user: true,
        regime: true,
        populationType: true,
        eps: true,
        ipsPrimary: true,
        ipsDental: true,
        affiliateType: true,
        methodology: true,
        level: true,
        membershipClass: true,
        groupSubgroup: true,
        affiliatedState: true,
      },
    });
  }

  async findOneBy(
    condition: Partial<AffiliatesEntity>,
  ): Promise<AffiliatesEntity> {
    return await this.repository.findOneBy(condition);
  }

  async update(entity: Partial<AffiliatesEntity>): Promise<AffiliatesEntity> {
    return this.repository.save(entity);
  }

  // ============================================================
  async findUserAndAffiliateByIdNumber(
    identificationNumber: number,
  ): Promise<UserEntity> {
    const qb = this.entityManager
      .getRepository(UserEntity)
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.affiliate', 'a')
      .leftJoinAndSelect('a.regime', 'regime')
      .leftJoinAndSelect('a.populationType', 'populationType')
      .leftJoinAndSelect('a.eps', 'eps')
      .leftJoinAndSelect('a.ipsPrimary', 'ipsPrimary')
      .leftJoinAndSelect('a.ipsDental', 'ipsDental')
      .leftJoinAndSelect('a.affiliatedState', 'affiliatedState')
      .leftJoinAndSelect('a.methodology', 'methodology')
      .leftJoinAndSelect('a.affiliateType', 'affiliateType')
      .leftJoinAndSelect('a.level', 'level')
      .leftJoinAndSelect('u.ethnicity', 'ethnicity')
      .leftJoinAndSelect('a.membershipClass', 'membershipClass')
      .leftJoinAndSelect('a.groupSubgroup', 'groupSubgroup')
      .leftJoinAndSelect('a.LMAUser', 'lma')
      .leftJoinAndSelect('a.historyUser', 'affHistory')
      .leftJoinAndSelect('u.country', 'country')
      .leftJoinAndSelect('u.department', 'department')
      .leftJoinAndSelect('u.municipality', 'municipality')
      .leftJoinAndSelect('u.identificationType', 'identificationType')
      .leftJoinAndSelect('u.area', 'area')
      .leftJoinAndSelect('u.sex', 'sex')
      .leftJoinAndSelect('u.disabilityType', 'disabilityType')
      .leftJoin('u.organization', 'org')
      .andWhere('u.identificationNumber = :idn', { idn: identificationNumber })
      .orderBy('u.updated_at', 'DESC');

    return await qb.getOne();
  }

  // ============================================================
  // 🔹 2) Bulk: muchos números en UNA consulta
  // ============================================================
  async findUsersAndAffiliatesByIdNumbers(
    organizationId: number,
    numbers: number[],
  ): Promise<
    Map<number, { user: UserEntity | null; affiliate: AffiliatesEntity | null }>
  > {
    const result = new Map<
      number,
      { user: UserEntity | null; affiliate: AffiliatesEntity | null }
    >();
    if (!numbers.length) return result;

    const qb = this.entityManager
      .getRepository(UserEntity)
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.affiliate', 'a')
      .leftJoinAndSelect('a.regime', 'regime')
      .leftJoinAndSelect('a.populationType', 'populationType')
      .leftJoinAndSelect('a.eps', 'eps')
      .leftJoinAndSelect('a.affiliatedState', 'affiliatedState')
      .leftJoinAndSelect('a.affiliateType', 'affiliateType')
      .leftJoinAndSelect('a.level', 'level')
      .leftJoinAndSelect('a.groupSubgroup', 'groupSubgroup')
      .leftJoinAndSelect('u.country', 'country')
      .leftJoinAndSelect('u.department', 'department')
      .leftJoinAndSelect('u.municipality', 'municipality')
      .leftJoinAndSelect('u.identificationType', 'identificationType')
      .leftJoinAndSelect('u.area', 'area')
      .leftJoinAndSelect('u.sex', 'sex')
      .leftJoin('u.organization', 'org')
      .where('org.id = :orgId', { orgId: organizationId })
      .andWhere('u.identificationNumber IN (:...ids)', { ids: numbers });

    // Si llegara a existir más de un user con el mismo número (no debería),
    // nos quedamos con el más “reciente” por número:
    const users = await qb
      .orderBy('u.identificationNumber', 'ASC')
      .addOrderBy('u.updated_at', 'DESC')
      .getMany();

    // Crea el map con el primer “más reciente” por número
    for (const u of users) {
      const key = u.identificationNumber;
      if (!result.has(key)) {
        result.set(key, { user: u, affiliate: u.affiliate ?? null });
      }
    }

    // Rellena los que no vinieron (no existen en BD)
    for (const num of numbers) {
      if (!result.has(num)) {
        result.set(num, { user: null, affiliate: null });
      }
    }

    return result;
  }

  async reportInformationGrafics(month: number, year: number) {
    const ACTIVE_STATE_ID = 1;

    // 1) Total de afiliados activos
    const totalAffiliates = await this.repository
      .createQueryBuilder('a')
      .innerJoin('a.affiliatedState', 'state')
      .where('state.id = :stateId', { stateId: ACTIVE_STATE_ID })
      .getCount();

    // 2) Gasto LMA del periodo (solo afiliados activos)
    const lmaRepo = this.entityManager.getRepository(LMAEntity);

    const lmaRaw = await lmaRepo
      .createQueryBuilder('lma')
      .innerJoin('lma.affiliate', 'a')
      .innerJoin('a.affiliatedState', 'state')
      .where('state.id = :stateId', { stateId: ACTIVE_STATE_ID })
      .andWhere('lma.month = :month', { month })
      .andWhere('lma.year = :year', { year })
      // paid es string, lo casteamos a decimal
      .select('COALESCE(SUM(CAST(lma.paid AS DECIMAL(18,2))), 0)', 'totalPaid')
      .getRawOne<{ totalPaid: string }>();

    const lmaAmount = Number(lmaRaw?.totalPaid ?? 0);

    // 3) Afiliados activos por régimen
    const rawByRegime = await this.repository
      .createQueryBuilder('a')
      .innerJoin('a.affiliatedState', 'state')
      .innerJoin('a.regime', 'regime')
      .where('state.id = :stateId', { stateId: ACTIVE_STATE_ID })
      .select('regime.name', 'regime')
      .addSelect('COUNT(*)', 'total')
      .groupBy('regime.id')
      .getRawMany<{ regime: string; total: string }>();

    const byRegime: Record<string, number> = {};
    rawByRegime.forEach((row) => {
      byRegime[row.regime] = Number(row.total);
    });

    // 4) Afiliados activos por EPS
    const rawByEps = await this.repository
      .createQueryBuilder('a')
      .innerJoin('a.affiliatedState', 'state')
      .leftJoin('a.eps', 'eps')
      .where('state.id = :stateId', { stateId: ACTIVE_STATE_ID })
      .select("COALESCE(eps.name, 'SIN EPS')", 'eps')
      .addSelect('COUNT(*)', 'total')
      .groupBy('eps')
      .getRawMany<{ eps: string; total: string }>();

    const byEps: Record<string, number> = {};
    rawByEps.forEach((row) => {
      byEps[row.eps] = Number(row.total);
    });

    // 5) Afiliados activos por sexo / género
    const rawByGender = await this.entityManager
      .getRepository(UserEntity)
      .createQueryBuilder('u')
      .innerJoin('u.affiliate', 'a')
      .innerJoin('a.affiliatedState', 'state')
      .innerJoin('u.sex', 'sex')
      .where('state.id = :stateId', { stateId: ACTIVE_STATE_ID })
      .select('sex.name', 'gender')
      .addSelect('COUNT(*)', 'total')
      .groupBy('sex.id')
      .getRawMany<{ gender: string; total: string }>();

    const byGender: Record<string, number> = {};
    rawByGender.forEach((row) => {
      byGender[row.gender.toUpperCase()] = Number(row.total);
    });

    // 6) Afiliados activos por rangos de edad (según fecha de nacimiento)
    const rawByAge = await this.entityManager
      .getRepository(UserEntity)
      .createQueryBuilder('u')
      .innerJoin('u.affiliate', 'a')
      .innerJoin('a.affiliatedState', 'state')
      .where('state.id = :stateId', { stateId: ACTIVE_STATE_ID })
      .select(
        `
        CASE
          WHEN TIMESTAMPDIFF(YEAR, u.birthdate, CURDATE()) < 1 THEN 'Menores de 1 año'
          WHEN TIMESTAMPDIFF(YEAR, u.birthdate, CURDATE()) BETWEEN 1 AND 4 THEN '1 - 4 años'
          WHEN TIMESTAMPDIFF(YEAR, u.birthdate, CURDATE()) BETWEEN 5 AND 14 THEN '5 - 14 años'
          WHEN TIMESTAMPDIFF(YEAR, u.birthdate, CURDATE()) BETWEEN 15 AND 44 THEN '15 - 44 años'
          WHEN TIMESTAMPDIFF(YEAR, u.birthdate, CURDATE()) BETWEEN 45 AND 59 THEN '45 - 59 años'
          ELSE '60 y más'
        END
      `,
        'ageGroup',
      )
      .addSelect('COUNT(*)', 'total')
      .groupBy('ageGroup')
      .getRawMany<{ ageGroup: string; total: string }>();

    // Inicializo todos los grupos con 0 para que el front siempre reciba el mismo shape
    const byAgeGroup: Record<string, number> = {
      'Menores de 1 año': 0,
      '1 - 4 años': 0,
      '5 - 14 años': 0,
      '15 - 44 años': 0,
      '45 - 59 años': 0,
      '60 y más': 0,
    };
    rawByAge.forEach((row) => {
      if (byAgeGroup[row.ageGroup] !== undefined) {
        byAgeGroup[row.ageGroup] = Number(row.total);
      }
    });

    // 7) Afiliados activos por tipo de población
    const rawByPopulation = await this.repository
      .createQueryBuilder('a')
      .innerJoin('a.affiliatedState', 'state')
      .leftJoin('a.populationType', 'pt')
      .where('state.id = :stateId', { stateId: ACTIVE_STATE_ID })
      .select("COALESCE(pt.name, 'Ninguna')", 'populationType')
      .addSelect('COUNT(*)', 'total')
      .groupBy('populationType')
      .getRawMany<{ populationType: string; total: string }>();

    const byPopulationType: Record<string, number> = {};
    rawByPopulation.forEach((row) => {
      byPopulationType[row.populationType] = Number(row.total);
    });

    return {
      totalAffiliates,
      lmaAmount,
      byRegime,
      byEps,
      byGender,
      byAgeGroup,
      byPopulationType,
    };
  }
}
