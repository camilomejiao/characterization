import { IPqrsRepository } from '../pqrs.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PqrsEntity } from '../../../../../common/entities/pqrs.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class Pqrs_mysqlRepository implements IPqrsRepository {
  constructor(
    @InjectRepository(PqrsEntity)
    private readonly repository: Repository<PqrsEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(entity: PqrsEntity): Promise<PqrsEntity> {
    return await this.entityManager.save(entity);
  }

  async findAll(): Promise<PqrsEntity[]> {
    return await this.repository.find({
      relations: {
        pqrsType: true,
        department: true,
        municipality: true,
        applicationStatus: true,
        reason: true,
        eps: true,
        user: true,
      },
    });
  }

  async findOneBy(condition: Partial<PqrsEntity>): Promise<PqrsEntity> {
    return await this.repository.findOne({
      where: condition,
      relations: {
        pqrsType: true,
        applicationStatus: true,
        department: true,
        municipality: true,
        reason: true,
        eps: true,
        userSystem: true,
        user: {
          identificationType: true,
          department: true,
          municipality: true,
          sex: true,
          area: true,
          disabilityType: true,
          organization: true,
        },
        notifications: {
          status: true,
        },
      },
    });
  }

  async update(entity: Partial<PqrsEntity>): Promise<PqrsEntity> {
    return this.repository.save(entity);
  }

  async findByAffiliateIdentification(
    identificationNumber: number,
  ): Promise<PqrsEntity[]> {
    return this.repository
      .createQueryBuilder('pqrs')
      .innerJoinAndSelect('pqrs.user', 'user') // Relación con userEntity
      .where('user.identificationNumber = :identificationNumber', {
        identificationNumber,
      })
      .getMany();
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async getInformationDetailExcel(startDate: string, endDate: string) {
    const qb = await this.repository
      .createQueryBuilder('pqrs')
      .leftJoinAndSelect('pqrs.pqrsType', 'pqrsType')
      .leftJoinAndSelect('pqrs.applicationStatus', 'applicationStatus')
      .leftJoinAndSelect('pqrs.department', 'department')
      .leftJoinAndSelect('pqrs.municipality', 'municipality')
      .leftJoinAndSelect('pqrs.reason', 'reason')
      .leftJoinAndSelect('pqrs.eps', 'eps')
      .leftJoinAndSelect('pqrs.user', 'user')
      .where('pqrs.created_at >= :startDate', {
        startDate: `${startDate} 00:00:00`,
      })
      .andWhere('pqrs.created_at <= :endDate', {
        endDate: `${endDate} 23:59:59`,
      })
      .orderBy('pqrs.created_at', 'DESC');

    //console.log('SQL:', qb.getSql());
    const rows = await qb.getMany();

    //console.log('rows:', JSON.stringify(rows, null, 2));
    return rows.map((pqrs) => ({
      id: pqrs.id,
      createdAt: (pqrs as any).created_at,
      affiliate:
        `${pqrs.user?.firstName ?? ''} ${pqrs.user?.middleName ?? ''} ${pqrs.user?.firstLastName ?? ''} ${pqrs.user?.middleLastName ?? ''}`.trim(),
      identification: pqrs.user?.identificationNumber ?? '',
      pqrsType: pqrs.pqrsType?.name ?? '',
      status: pqrs.applicationStatus?.name ?? '',
      department: pqrs.department?.name ?? '',
      municipality: pqrs.municipality?.name ?? '',
      reason: pqrs.reason?.name ?? '',
      eps: pqrs.eps?.name ?? '',
      entity: pqrs.entity ?? '',
      dateOfEvents: pqrs.dateOfEvents ?? '',
      descriptionOfEvents: pqrs.descriptionOfEvents ?? '',
    }));
  }
}
