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
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//Dto
import { AffiliateDto } from './dto/affiliate.dto';

//Use case
import { CreateAffiliateUsecase } from '../../domain/input-ports/use-cases/create-affiliate.usecase';
import { GetAffiliateUsecase } from '../../domain/input-ports/use-cases/get-affiliate.usecase';
import { UpdateAffiliateUsecase } from '../../domain/input-ports/use-cases/update-affiliate.usecase';
import { UpdateAffiliateDto } from './dto/update-affiliate.dto';

@Controller('affiliates')
export class AffiliatesController {
  constructor(
    @Inject(CreateAffiliateUsecase)
    private createAffiliatesUseCase: CreateAffiliateUsecase,
    @Inject(GetAffiliateUsecase)
    private getAffiliateUseCase: GetAffiliateUsecase,
    @Inject(UpdateAffiliateUsecase)
    private updateAffiliateUseCase: UpdateAffiliateUsecase,
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

  @Get()
  @UseGuards(AuthGuard('jwt'))
  public async getUserByIdentification(
    @Query('identificationNumber') idNumber: number,
  ) {
    if (!idNumber) {
      throw new HttpException(
        'Identification number is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const affiliate = await this.getAffiliateUseCase.handler(idNumber);

    if (!affiliate) {
      throw new HttpException(
        `User with identification number ${idNumber} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return { data: affiliate };
  }

  @Put('update/:id')
  public async updateUser(
    @Param('id') id: number,
    @Body() updateAffiliateDto: UpdateAffiliateDto,
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
}
