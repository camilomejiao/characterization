import { UserEntity } from '../../../../../../common/entities/user.entity';
import { BulkAffiliateRowDto } from '../../../../adapters/input/dto/dataBulk.dto';

export class ValidateDiffUserUsecase {
  constructor() {}

  public async handler(
    current: UserEntity,
    row: BulkAffiliateRowDto,
  ): Promise<Partial<UserEntity>> {
    const patch: Partial<UserEntity> = {};
    const notEmpty = (v: any) =>
      v !== undefined &&
      v !== null &&
      !(typeof v === 'string' && v.trim() === '');

    if (notEmpty(row.firstName) && row.firstName !== current.firstName)
      patch.firstName = row.firstName!;
    if (notEmpty(row.middleName) && row.middleName !== current.middleName)
      patch.middleName = row.middleName!;
    if (
      notEmpty(row.firstLastName) &&
      row.firstLastName !== current.firstLastName
    )
      patch.firstLastName = row.firstLastName!;
    if (
      notEmpty(row.middleLastName) &&
      row.middleLastName !== current.middleLastName
    )
      patch.middleLastName = row.middleLastName!;
    if (notEmpty(row.birthdate) && row.birthdate !== current.birthdate)
      patch.birthdate = row.birthdate!;
    if (notEmpty(row.email) && row.email !== current.email)
      patch.email = row.email!;
    if (notEmpty(row.phoneNumber) && row.phoneNumber !== current.phoneNumber)
      patch.phoneNumber = row.phoneNumber!;
    if (notEmpty(row.neighborhood) && row.neighborhood !== current.neighborhood)
      patch.neighborhood = row.neighborhood!;
    if (notEmpty(row.address) && row.address !== current.address)
      patch.address = row.address!;

    if (row.departmentId && current.department?.id !== row.departmentId)
      patch.department = { id: row.departmentId } as any;
    if (row.municipalityId && current.municipality?.id !== row.municipalityId)
      patch.municipality = { id: row.municipalityId } as any;
    if (row.countryId && current.country?.id !== row.countryId)
      patch.country = { id: row.countryId } as any;
    if (row.areaId && current.area?.id !== row.areaId)
      patch.area = { id: row.areaId } as any;
    if (row.genderId && current.gender?.id !== row.genderId)
      patch.gender = { id: row.genderId } as any;
    if (
      row.disabilityTypeId &&
      current.disabilityType?.id !== row.disabilityTypeId
    )
      patch.disabilityType = { id: row.disabilityTypeId } as any;

    // 🔸 Cambio TI→CC (mismo número)
    if (
      row.identificationTypeId &&
      current.identificationType?.id !== row.identificationTypeId
    ) {
      patch.identificationType = { id: row.identificationTypeId } as any;
    }

    return patch;
  }
}
