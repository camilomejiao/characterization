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
      const a = await this.affiliateRepo.reportInformationGrafics(month, year);
      console.log(a);
      return a;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
