import { Inject, Logger } from '@nestjs/common';
import { IAffiliateRepository } from '../../output-ports/affiliate.repository';

export class GetReportUsecase {
  private readonly logger = new Logger(GetReportUsecase.name);

  constructor(
    @Inject(IAffiliateRepository)
    private readonly affiliateRepo: IAffiliateRepository,
  ) {}

  public async handler(month: number, year: number) {
    try {
      return await this.affiliateRepo.reportInformationGrafics(month, year);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
