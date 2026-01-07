import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//Dto
import { AffiliateDto } from './dto/affiliate.dto';
import { BulkAffiliateDto } from './dto/dataBulk.dto';

//Use case
import { Create_affiliateUsecase } from '../../domain/input-ports/use-cases/create_affiliate.usecase';
import { Update_affiliateUsecase } from '../../domain/input-ports/use-cases/update_affiliate.usecase';
import { BulkAffiliateUsecase } from '../../domain/input-ports/use-cases/bulk/bulk_affiliate_usecase';
import { GetAffiliateListUsecase } from '../../domain/input-ports/use-cases/get-affiliate-list.usecase';

//Entity
import { AffiliatesEntity } from '../../../../common/entities/affiliate.entity';
import { Get_affilate_by_idUsecase } from '../../domain/input-ports/use-cases/get_affilate_by_id.usecase';
import { GetAffiliateInformationUsecase } from '../../domain/input-ports/use-cases/get_affiliate_information.usecase';
import { GetReportUsecase } from '../../domain/input-ports/use-cases/get_report.usecase';

@Controller('affiliates')
export class AffiliatesController {
  constructor(
    @Inject(Create_affiliateUsecase)
    private createAffiliatesUseCase: Create_affiliateUsecase,
    @Inject(Get_affilate_by_idUsecase)
    private getAffilateByIdUseCase: Get_affilate_by_idUsecase,
    @Inject(GetAffiliateListUsecase)
    private getAffiliateListUseCase: GetAffiliateListUsecase,
    @Inject(Update_affiliateUsecase)
    private updateAffiliateUseCase: Update_affiliateUsecase,
    @Inject(GetAffiliateInformationUsecase)
    private getAffiliateInformationUsecase: GetAffiliateInformationUsecase,
    @Inject(BulkAffiliateUsecase)
    private bulkAffiliateUsecase: BulkAffiliateUsecase,
    @Inject(GetReportUsecase)
    private getReportUsecase: GetReportUsecase,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  public async create(
    @Body() affiliateDto: AffiliateDto,
  ): Promise<{ data: { type: string; id: string } }> {
    const affiliate = await this.createAffiliatesUseCase.handler(affiliateDto);

    if (affiliate) {
      return {
        data: {
          type: 'affiliate',
          id: `${affiliate.id}`,
        },
      };
    }

    if (!affiliate) {
      throw new HttpException('User not created', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('list')
  @UseGuards(AuthGuard('jwt'))
  public async listAffiliate(): Promise<AffiliatesEntity[]> {
    return await this.getAffiliateListUseCase.handler();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  public async getUserById(@Param('id') id: number): Promise<AffiliatesEntity> {
    return await this.getAffilateByIdUseCase.handler(id);
  }

  @Put('update/:id')
  @UseGuards(AuthGuard('jwt'))
  public async updateUser(
    @Param('id') id: number,
    @Body() updateAffiliateDto: AffiliateDto,
  ): Promise<{ data: AffiliatesEntity }> {
    const updatedAffiliate = await this.updateAffiliateUseCase.handler(
      id,
      updateAffiliateDto,
    );

    if (!updatedAffiliate) {
      throw new HttpException(
        `User with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return { data: updatedAffiliate };
  }

  @Get('identification/:identificationNumber')
  @UseGuards(AuthGuard('jwt'))
  public async getUserByIdentification(
    @Param('identificationNumber') identificationNumber: number,
  ) {
    const number = identificationNumber;

    if (isNaN(number)) {
      throw new BadRequestException('Parámetros inválidos');
    }

    return await this.getAffiliateInformationUsecase.handler(number);
  }

  @Post('bulk')
  @UseGuards(AuthGuard('jwt'))
  public async bulk(@Body() dataBulkDto: BulkAffiliateDto): Promise<{
    data: {
      total: number;
      success: number;
      userUpdated: number;
      affiliateUpdated: number;
      lmaInserted: number;
      notFoundUsers: { identificationNumber: number }[];
      usersWithoutAffiliate: { identificationNumber: number }[];
      skippedLmaWithoutAffiliate: { identificationNumber: number }[];
      rowErrors: {
        index: number;
        identificationNumber?: number;
        message: string;
      }[];
    };
  }> {
    const summary = await this.bulkAffiliateUsecase.handler(dataBulkDto);
    return { data: summary };
  }

  @Get('report-information-graphics/:month/:year')
  @UseGuards(AuthGuard('jwt'))
  public async getReportGraphics(
    @Param('month') month: number,
    @Param('year') year: number,
  ): Promise<{
    totalAffiliates: number;
    lmaAmount: number;
    byRegime: Record<string, number>;

    byEpsByRegime: Record<string, Record<string, number>>;
    byGenderByRegime: Record<string, Record<string, number>>;
    byAgeGroupByRegime: Record<string, Record<string, number>>;
    byPopulationTypeByRegime: Record<string, Record<string, number>>;
  }> {
    return await this.getReportUsecase.handler(month, year);
  }
}
