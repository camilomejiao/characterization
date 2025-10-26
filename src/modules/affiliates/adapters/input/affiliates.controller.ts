import {
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

//Use case
import { Create_affiliateUsecase } from '../../domain/input-ports/use-cases/create_affiliate.usecase';
import { Get_affiliate_by_identifiactionUsecase } from '../../domain/input-ports/use-cases/get_affiliate_by_identifiaction.usecase';
import { Update_affiliateUsecase } from '../../domain/input-ports/use-cases/update_affiliate.usecase';
import { Bulk_affiliateUsecase } from '../../domain/input-ports/use-cases/bulk_affiliate.usecase';
import { GetAffiliateListUsecase } from '../../domain/input-ports/use-cases/get-affiliate-list.usecase';

//Entity
import { AffiliatesEntity } from '../../../../common/entities/affiliate.entity';
import { Get_affilate_by_idUsecase } from '../../domain/input-ports/use-cases/get_affilate_by_id.usecase';
import { Data } from './dto/dataBulk.dto';

@Controller('affiliates')
export class AffiliatesController {
  constructor(
    @Inject(Create_affiliateUsecase)
    private createAffiliatesUseCase: Create_affiliateUsecase,
    @Inject(Get_affilate_by_idUsecase)
    private getAffilateByIdUseCase: Get_affilate_by_idUsecase,
    @Inject(GetAffiliateListUsecase)
    private getAffiliateListUseCase: GetAffiliateListUsecase,
    @Inject(Get_affiliate_by_identifiactionUsecase)
    private getAffiliateUseCase: Get_affiliate_by_identifiactionUsecase,
    @Inject(Update_affiliateUsecase)
    private updateAffiliateUseCase: Update_affiliateUsecase,
    @Inject(Bulk_affiliateUsecase)
    private bulkAffiliateUsecase: Bulk_affiliateUsecase,
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

  @Get(':identificationNumber')
  @UseGuards(AuthGuard('jwt'))
  public async getUserByIdentification(
    @Param('identificationNumber') identificationNumber: number,
  ) {
    if (!identificationNumber) {
      throw new HttpException(
        'Identification number is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const affiliate =
      await this.getAffiliateUseCase.handler(identificationNumber);

    return { data: affiliate };
  }

  @Put('update/:id')
  public async updateUser(
    @Param('id') id: number,
    @Body() updateAffiliateDto: AffiliateDto,
  ) {
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

  @Post('bulk')
  @UseGuards(AuthGuard('jwt'))
  public async bulk(@Body() dataBulkDto: Data) {
    const process = this.bulkAffiliateUsecase.handler(dataBulkDto);
  }
}
