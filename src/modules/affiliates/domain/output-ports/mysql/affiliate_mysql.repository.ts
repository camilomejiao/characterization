import { Injectable } from '@nestjs/common';
import { IAffiliateRepository } from '../affiliate.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AffiliatesEntity } from '../../../../../common/entities/affiliate.entity';
import { EntityManager, Repository } from 'typeorm';
import { UserEntity } from '../../../../../common/entities/user.entity';

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
        state: true,
        affiliateType: true,
        methodology: true,
        level: true,
        membershipClass: true,
        ethnicity: true,
        community: true,
        groupSubgroup: true,
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
        ethnicity: true,
        community: true,
        groupSubgroup: true,
        state: true,
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
  // 🔹 1) Un número -> user (LEFT) + affiliate (LEFT)
  // ============================================================
  async findUserAndAffiliateByIdNumber(
    organizationId: number,
    identificationNumber: number,
  ): Promise<{ user: UserEntity | null; affiliate: AffiliatesEntity | null }> {
    const qb = this.entityManager
      .getRepository(UserEntity)
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.affiliate', 'a')
      .leftJoinAndSelect('a.regime', 'regime')
      .leftJoinAndSelect('a.populationType', 'populationType')
      .leftJoinAndSelect('a.eps', 'eps')
      .leftJoinAndSelect('a.ipsPrimary', 'ipsPrimary')
      .leftJoinAndSelect('a.ipsDental', 'ipsDental')
      .leftJoinAndSelect('a.state', 'state')
      .leftJoinAndSelect('a.affiliateType', 'affiliateType')
      .leftJoinAndSelect('a.methodology', 'methodology')
      .leftJoinAndSelect('a.level', 'level')
      .leftJoinAndSelect('a.membershipClass', 'membershipClass')
      .leftJoinAndSelect('a.ethnicity', 'ethnicity')
      .leftJoinAndSelect('a.community', 'community')
      .leftJoinAndSelect('a.groupSubgroup', 'groupSubgroup')
      .leftJoinAndSelect('u.department', 'department')
      .leftJoinAndSelect('u.municipality', 'municipality')
      .leftJoinAndSelect('u.identificationType', 'identificationType')
      .leftJoinAndSelect('u.area', 'area')
      .leftJoinAndSelect('u.gender', 'gender')
      .leftJoinAndSelect('u.disabilityType', 'disabilityType')
      .leftJoin('u.organization', 'org')
      .where('org.id = :orgId', { orgId: organizationId })
      .andWhere('u.identificationNumber = :idn', { idn: identificationNumber })
      .orderBy('u.updated_at', 'DESC') // en caso (raro) de duplicados por número, coge el más “reciente”
      .limit(1);

    const user = await qb.getOne();
    return { user: user ?? null, affiliate: user?.affiliate ?? null };
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
      .leftJoinAndSelect('a.ipsPrimary', 'ipsPrimary')
      .leftJoinAndSelect('a.ipsDental', 'ipsDental')
      .leftJoinAndSelect('a.state', 'state')
      .leftJoinAndSelect('a.affiliateType', 'affiliateType')
      .leftJoinAndSelect('a.methodology', 'methodology')
      .leftJoinAndSelect('a.level', 'level')
      .leftJoinAndSelect('a.membershipClass', 'membershipClass')
      .leftJoinAndSelect('a.ethnicity', 'ethnicity')
      .leftJoinAndSelect('a.community', 'community')
      .leftJoinAndSelect('a.groupSubgroup', 'groupSubgroup')
      .leftJoinAndSelect('u.department', 'department')
      .leftJoinAndSelect('u.municipality', 'municipality')
      .leftJoinAndSelect('u.identificationType', 'identificationType')
      .leftJoinAndSelect('u.area', 'area')
      .leftJoinAndSelect('u.gender', 'gender')
      .leftJoinAndSelect('u.disabilityType', 'disabilityType')
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
}
