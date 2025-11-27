import { Inject } from '@nestjs/common';

//Entity
import { AffiliatesEntity } from '../../../../../../common/entities/affiliate.entity';
//Dto
import { BulkAffiliateRowDto } from '../../../../adapters/input/dto/dataBulk.dto';
//Interfaces
import { IPopulationTypeRepository } from '../../../../../common/domain/output-ports/population_type.repository';
import { IEpsRepository } from '../../../../../common/domain/output-ports/eps.repository';
import { ILevelRepository } from '../../../../../common/domain/output-ports/level.repository';
import { IGroupSubgroupRespository } from '../../../../../common/domain/output-ports/group_subgroup.respository';
import { IAffiliatedStateRepository } from '../../../../../common/domain/output-ports/affiliated_state.repository';

export class ValidateDiffAffiliateUsecase {
  constructor(
    @Inject(IPopulationTypeRepository)
    private readonly populationTypeRepository: IPopulationTypeRepository,
    @Inject(IEpsRepository)
    private readonly epsRepository: IEpsRepository,
    @Inject(IAffiliatedStateRepository)
    private readonly affiliatedStateRepository: IAffiliatedStateRepository,
    @Inject(ILevelRepository)
    private readonly levelRepository: ILevelRepository,
    @Inject(IGroupSubgroupRespository)
    private readonly groupSubgroupRespository: IGroupSubgroupRespository,
  ) {}

  public async handler(
    current: AffiliatesEntity,
    row: BulkAffiliateRowDto,
  ): Promise<Partial<AffiliatesEntity>> {
    try {
      const patch: Partial<AffiliatesEntity> = {};

      if (
        this.notEmpty(row.sisbenNumber) &&
        row.sisbenNumber !== current.sisbenNumber
      ) {
        patch.sisbenNumber = row.sisbenNumber!;
      }

      if (
        this.notEmpty(row.dateOfAffiliated) &&
        row.dateOfAffiliated !== current.dateOfAffiliated
      ) {
        patch.dateOfAffiliated = row.dateOfAffiliated!;
      }

      // Population Type -> ID (9,5,16)
      if (
        row.populationTypeId &&
        current.populationType?.id !== row.populationTypeId
      ) {
        patch.populationType = await this.validateFieldOrIdEntity(
          row.populationTypeId,
          this.populationTypeRepository,
          'id',
          'Tipo de población',
        );
      }

      if (row.eps && current.eps?.cod !== row.eps) {
        patch.eps = await this.validateFieldOrIdEntity(
          row.eps,
          this.epsRepository,
          'cod',
          'EPS',
        );
      }

      if (row.state && current.affiliatedState?.cod !== row.state) {
        patch.affiliatedState = await this.validateFieldOrIdEntity(
          row.state,
          this.affiliatedStateRepository,
          'cod',
          'Estado de afiliación',
        );
      }

      if (row.level && current.level?.id !== row.level) {
        patch.level = await this.validateFieldOrIdEntity(
          row.level,
          this.levelRepository,
          'id',
          'Nivel del sisben',
        );
      }

      if (
        row.groupSubgroup &&
        current.groupSubgroup?.subgroup !== row.groupSubgroup
      ) {
        patch.groupSubgroup = await this.validateFieldOrIdEntity(
          row.groupSubgroup,
          this.groupSubgroupRespository,
          'subgroup',
          'Grupo y Subgrupo',
        );
      }

      return patch;
    } catch (error) {
      console.log(error);
      throw error; // 👈 clave para que el BulkAffiliateUsecase lo capture
    }
  }

  private notEmpty = (v: any) =>
    v !== undefined &&
    v !== null &&
    !(typeof v === 'string' && v.trim() === '');

  private async validateFieldOrIdEntity(
    value: string | number,
    repository: any,
    field: string,
    entityName: string,
  ): Promise<any> {
    let entity = null;

    if (typeof value === 'number' || /^\d+$/.test(String(value))) {
      entity = await repository.findOneBy({ id: Number(value) });
    } else {
      entity = await repository.findOneBy({ [field]: value });
    }

    if (!entity) {
      throw new Error(`${entityName} with ${field} "${value}" not found`);
    }

    return { id: entity.id };
  }
}
