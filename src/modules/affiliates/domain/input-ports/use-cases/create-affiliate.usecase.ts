//Entity
import { AffiliatesEntity } from '../../../../../common/entities/affiliate.entity';

//Dto
import { AffiliateDto } from '../../../adapters/input/dto/affiliate.dto';

//Repository
import { IAffiliateRepository } from '../../output-ports/affiliate.repository';
import { IDepartmentRepository } from '../../../../department-municipality/domain/output-ports/department.repository';
import { IMunicipalityRepository } from '../../../../department-municipality/domain/output-ports/municipality.repository';
import { IAffiliateTypeRepository } from '../../../../common/domain/output-ports/affiliate-type.repository';
import { IAreaRepository } from '../../../../common/domain/output-ports/area.repository';
import { ICommunityRepository } from '../../../../common/domain/output-ports/community.repository';
import { IDisabilityTypeRepository } from '../../../../common/domain/output-ports/disability-type.repository';
import { IEpsRepository } from '../../../../common/domain/output-ports/eps.repository';
import { IEthnicityRepository } from '../../../../common/domain/output-ports/ethnicity.repository';
import { IGenderRepository } from '../../../../common/domain/output-ports/gender.repository';
import { IIdentificationTypeRepository } from '../../../../common/domain/output-ports/identification-type.repository';
import { ILevelRepository } from '../../../../common/domain/output-ports/level.repository';
import { IMembershipClassRepository } from '../../../../common/domain/output-ports/membership-class.repository';
import { IMethodologyRepository } from '../../../../common/domain/output-ports/methodology.repository';
import { IPopulationTypeRepository } from '../../../../common/domain/output-ports/population-type.repository';
import { Inject } from '@nestjs/common';

export class CreateAffiliateUsecase {
  constructor(
    @Inject(IAffiliateRepository)
    private affiliateRepository: IAffiliateRepository,
    @Inject(IDepartmentRepository)
    private departmentRepository: IDepartmentRepository,
    @Inject(IMunicipalityRepository)
    private municipalityRepository: IMunicipalityRepository,
    @Inject(IAffiliateTypeRepository)
    private affiliateTypeRepository: IAffiliateTypeRepository,
    @Inject(IAreaRepository)
    private areaRepository: IAreaRepository,
    @Inject(ICommunityRepository)
    private communityRepository: ICommunityRepository,
    @Inject(IDisabilityTypeRepository)
    private disabilityTypeRepository: IDisabilityTypeRepository,
    @Inject(IEpsRepository)
    private epsRepository: IEpsRepository,
    @Inject(IEthnicityRepository)
    private ethnicityRepository: IEthnicityRepository,
    @Inject(IGenderRepository)
    private genderRepository: IGenderRepository,
    @Inject(IIdentificationTypeRepository)
    private identificationTypeRepository: IIdentificationTypeRepository,
    @Inject(ILevelRepository)
    private iLevelRepository: ILevelRepository,
    @Inject(IMembershipClassRepository)
    private membershipClassRepository: IMembershipClassRepository,
    @Inject(IMethodologyRepository)
    private methodologyRepository: IMethodologyRepository,
    @Inject(IPopulationTypeRepository)
    private populationTypeRepository: IPopulationTypeRepository,
  ) {}

  public async handler(affiliateDto: AffiliateDto): Promise<AffiliatesEntity> {
    try {
      // Validar relaciones
      const department = await this.getDepartment(affiliateDto.departmentId);
      const municipality = await this.getMunicipality(
        affiliateDto.municipalityId,
      );
      const populationType = await this.getPopulationType(
        affiliateDto.populationTypeId,
      );
      const eps = await this.getEps(affiliateDto.epsId);
      const affiliateType = await this.getAffiliateType(
        affiliateDto.affiliateTypeId,
      );
      const area = await this.getArea(affiliateDto.areaId);
      const community = await this.getCommunity(affiliateDto.communityId);
      const disabilityType = await this.getDisabilityType(
        affiliateDto.disabilityTypeId,
      );
      const ethnicity = await this.getEthnicity(affiliateDto.ethnicityId);
      const gender = await this.getGender(affiliateDto.genderId);
      const identificationType = await this.getIdentificationType(
        affiliateDto.identificationTypeId,
      );
      const level = await this.getLevel(affiliateDto.levelId);
      const membershipClass = await this.getMembershipClass(
        affiliateDto.membershipClassId,
      );
      const methodology = await this.getMethodology(affiliateDto.methodologyId);

      // Crear la entidad
      const affiliate = new AffiliatesEntity({
        department,
        municipality,
        populationType,
        eps,
        affiliateType,
        area,
        community,
        disabilityType,
        ethnicity,
        gender,
        identificationType,
        identificationNumber: affiliateDto.identificationNumber,
        level,
        membershipClass,
        methodology,
        firstName: affiliateDto.firstName,
        middleName: affiliateDto.middleName,
        firstLastName: affiliateDto.firstLastName,
        middleLastName: affiliateDto.middleLastName,
        birthdate: affiliateDto.birthdate,
        email: affiliateDto.email,
        phoneNumber: affiliateDto.phoneNumber,
      });

      // Guardar en la base de datos
      return await this.affiliateRepository.create(affiliate);
    } catch (error) {
      throw error;
    }
  }

  private async getDepartment(departmentId: number) {
    return this.validateEntity(
      this.departmentRepository,
      departmentId,
      'Department',
    );
  }

  private async getMunicipality(municipalityId: number) {
    return this.validateEntity(
      this.municipalityRepository,
      municipalityId,
      'Municipality',
    );
  }

  private async getPopulationType(populationTypeId: number) {
    return this.validateEntity(
      this.populationTypeRepository,
      populationTypeId,
      'Population type',
    );
  }

  private async getEps(epsId: number) {
    return this.validateEntity(this.epsRepository, epsId, 'EPS');
  }

  private async getAffiliateType(affiliateTypeId: number) {
    return this.validateEntity(
      this.affiliateTypeRepository,
      affiliateTypeId,
      'Affiliate type',
    );
  }

  private async getArea(areaId: number) {
    return this.validateEntity(this.areaRepository, areaId, 'Area');
  }

  private async getCommunity(communityId: number) {
    return this.validateEntity(
      this.communityRepository,
      communityId,
      'Community',
    );
  }

  private async getDisabilityType(disabilityTypeId: number) {
    return this.validateEntity(
      this.disabilityTypeRepository,
      disabilityTypeId,
      'Disability type',
    );
  }

  private async getEthnicity(ethnicityId: number) {
    return this.validateEntity(
      this.ethnicityRepository,
      ethnicityId,
      'Ethnicity',
    );
  }

  private async getGender(genderId: number) {
    return this.validateEntity(this.genderRepository, genderId, 'Gender');
  }

  private async getIdentificationType(identificationTypeId: number) {
    return this.validateEntity(
      this.identificationTypeRepository,
      identificationTypeId,
      'Identification type',
    );
  }

  private async getLevel(levelId: number) {
    return this.validateEntity(this.iLevelRepository, levelId, 'Level');
  }

  private async getMembershipClass(membershipClassId: number) {
    return this.validateEntity(
      this.membershipClassRepository,
      membershipClassId,
      'Membership class',
    );
  }

  private async getMethodology(methodologyId: number) {
    return this.validateEntity(
      this.methodologyRepository,
      methodologyId,
      'Methodology',
    );
  }

  private async validateEntity(
    repository: any,
    id: number,
    entityName: string,
  ) {
    const entity = await repository.findOneBy({ id });
    if (!entity) {
      throw new Error(`${entityName} with ID ${id} not found`);
    }
    return entity;
  }
}
