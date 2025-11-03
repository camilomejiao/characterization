import { AffiliatesEntity } from '../../../../../../common/entities/affiliate.entity';
import { BulkAffiliateRowDto } from '../../../../adapters/input/dto/dataBulk.dto';

export class ValidateDiffAffiliateUsecase {
  constructor() {}

  public async handler(
    current: AffiliatesEntity,
    row: BulkAffiliateRowDto,
    regimeId: number,
  ): Promise<Partial<AffiliatesEntity>> {
    const patch: Partial<AffiliatesEntity> = {};
    const notEmpty = (v: any) => !this.isEmpty(v);

    if (regimeId && current.regime?.id !== regimeId)
      patch.regime = { id: regimeId } as any;
    if (
      row.populationTypeId &&
      current.populationType?.id !== row.populationTypeId
    )
      patch.populationType = { id: row.populationTypeId } as any;
    if (row.epsId && current.eps?.id !== row.epsId)
      patch.eps = { id: row.epsId } as any;
    if (row.ipsPrimaryId && current.ipsPrimary?.id !== row.ipsPrimaryId)
      patch.ipsPrimary = { id: row.ipsPrimaryId } as any;
    if (row.ipsDentalId && current.ipsDental?.id !== row.ipsDentalId)
      patch.ipsDental = { id: row.ipsDentalId } as any;
    if (row.stateId && current.state?.id !== row.stateId)
      patch.state = { id: row.stateId } as any;
    if (
      row.affiliateTypeId &&
      current.affiliateType?.id !== row.affiliateTypeId
    )
      patch.affiliateType = { id: row.affiliateTypeId } as any;
    if (row.methodologyId && current.methodology?.id !== row.methodologyId)
      patch.methodology = { id: row.methodologyId } as any;
    if (row.levelId && current.level?.id !== row.levelId)
      patch.level = { id: row.levelId } as any;
    if (
      row.membershipClassId &&
      current.membershipClass?.id !== row.membershipClassId
    )
      patch.membershipClass = { id: row.membershipClassId } as any;
    if (row.ethnicityId && current.ethnicity?.id !== row.ethnicityId)
      patch.ethnicity = { id: row.ethnicityId } as any;
    if (row.communityId && current.community?.id !== row.communityId)
      patch.community = { id: row.communityId } as any;
    if (
      row.groupSubgroupId &&
      current.groupSubgroup?.id !== row.groupSubgroupId
    )
      patch.groupSubgroup = { id: row.groupSubgroupId } as any;

    if (notEmpty(row.sisbenNumber) && row.sisbenNumber !== current.sisbenNumber)
      patch.sisbenNumber = row.sisbenNumber!;
    if (notEmpty(row.formNumber) && row.formNumber !== current.formNumber)
      patch.formNumber = row.formNumber!;
    if (
      notEmpty(row.dateOfAffiliated) &&
      row.dateOfAffiliated !== current.dateOfAffiliated
    )
      patch.dateOfAffiliated = row.dateOfAffiliated!;

    return patch;
  }

  private isEmpty(v: any) {
    return (
      v === undefined ||
      v === null ||
      (typeof v === 'string' && v.trim() === '')
    );
  }
}
