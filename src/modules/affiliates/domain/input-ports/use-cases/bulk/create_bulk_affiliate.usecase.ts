import { BadRequestException, Inject } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { AffiliatesEntity } from '../../../../../../common/entities/affiliate.entity';
import { UserEntity } from '../../../../../../common/entities/user.entity';

import { BulkAffiliateRowDto } from '../../../../adapters/input/dto/dataBulk.dto';

import { IRegimeRepository } from '../../../../../common/domain/output-ports/regime.repository';
import { IPopulationTypeRepository } from '../../../../../common/domain/output-ports/population_type.repository';
import { IEpsRepository } from '../../../../../common/domain/output-ports/eps.repository';
import { IAffiliatedStateRepository } from '../../../../../common/domain/output-ports/affiliated_state.repository';
import { ILevelRepository } from '../../../../../common/domain/output-ports/level.repository';
import { IGroupSubgroupRespository } from '../../../../../common/domain/output-ports/group_subgroup.respository';

export class CreateBulkAffiliateUsecase {
  constructor(
    @Inject(IRegimeRepository)
    private readonly regimeRepository: IRegimeRepository,

    @Inject(IPopulationTypeRepository)
    private readonly populationTypeRepository: IPopulationTypeRepository,

    @Inject(IEpsRepository)
    private readonly epsRepository: IEpsRepository,

    @Inject(IAffiliatedStateRepository)
    private readonly affiliatedStateRepository: IAffiliatedStateRepository,

    @Inject(ILevelRepository)
    private readonly levelRepository: ILevelRepository,

    @Inject(IGroupSubgroupRespository)
    private readonly groupSubgroupRepository: IGroupSubgroupRespository,
  ) {}

  public async handler(
    manager: EntityManager,
    row: BulkAffiliateRowDto,
    user: UserEntity,
    regimeId: number,
  ): Promise<AffiliatesEntity> {
    if (!user?.id) {
      throw new BadRequestException('Usuario requerido para crear afiliación');
    }

    const regime = await this.getRelation(
      regimeId,
      this.regimeRepository,
      'id',
      'Régimen',
      true,
    );

    const populationType = await this.getRelation(
      row.populationTypeId,
      this.populationTypeRepository,
      'id',
      'Tipo de población',
    );

    const eps = await this.getRelation(
      row.eps,
      this.epsRepository,
      'code',
      'EPS',
    );

    const affiliatedState = await this.getRelation(
      row.state,
      this.affiliatedStateRepository,
      'code',
      'Estado de afiliación',
    );

    const level = await this.getRelation(
      row.level,
      this.levelRepository,
      'id',
      'Nivel',
    );

    const groupSubgroup = await this.getRelation(
      row.groupSubgroup,
      this.groupSubgroupRepository,
      'subgroup',
      'Grupo y subgrupo',
    );

    const affiliate = manager.create(AffiliatesEntity, {
      user: { id: user.id },
      regime,
      populationType,
      eps,
      affiliatedState,
      level,
      groupSubgroup,
      sisbenNumber: this.clean(row.sisbenNumber),
      dateOfAffiliated: this.clean(row.dateOfAffiliated),
    });

    return await manager.save(AffiliatesEntity, affiliate);
  }

  private async getRelation(
    value: any,
    repository: any,
    field: string,
    entityName: string,
    required = false,
  ): Promise<any | null> {
    const isEmpty =
      value === undefined ||
      value === null ||
      String(value).trim() === '' ||
      String(value).trim() === '0';

    if (isEmpty) {
      if (required) {
        throw new BadRequestException(`${entityName} es obligatorio`);
      }

      return null;
    }

    const cleanValue = typeof value === 'string' ? value.trim() : value;

    const search =
      field === 'id' ? { id: Number(cleanValue) } : { [field]: cleanValue };

    const entity = await repository.findOneBy(search);

    if (!entity) {
      throw new BadRequestException(
        `${entityName} con valor "${value}" no existe en base de datos`,
      );
    }

    return entity;
  }

  private clean(value: any): any {
    if (
      value === undefined ||
      value === null ||
      String(value).trim() === '' ||
      String(value).trim() === '0'
    ) {
      return null;
    }

    return typeof value === 'string' ? value.trim() : value;
  }
}
