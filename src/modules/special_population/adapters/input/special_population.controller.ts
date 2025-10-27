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
import { CreateDto } from './dto/create.dto';
import { CreateSpecialPopulationUsecase } from '../../domain/input-ports/use-case/create_special_population.usecase';
import { SpecialPopulationEntity } from '../../../../common/entities/special_population.entity';
import { GetSpecialPopulationListUsecase } from '../../domain/input-ports/use-case/get_special_population_list.usecase';
import { GetSpecialPopulationUserByIdUsecase } from '../../domain/input-ports/use-case/get_special_population_user_by_id.usecase';
import { UpdateDto } from './dto/update.dto';
import { UpdateSpecialPopulationUsecase } from '../../domain/input-ports/use-case/update_special_population.usecase';

@Controller('special-population')
export class SpecialPopulationController {
  constructor(
    @Inject(CreateSpecialPopulationUsecase)
    private createSpecialPopulationUsecase: CreateSpecialPopulationUsecase,
    @Inject(GetSpecialPopulationListUsecase)
    private getSpecialPopulationListUsecase: GetSpecialPopulationListUsecase,
    @Inject(GetSpecialPopulationUserByIdUsecase)
    private getSpecialPopulationUserByIdUsecase: GetSpecialPopulationUserByIdUsecase,
    @Inject(UpdateSpecialPopulationUsecase)
    private updateSpecialPopulationUsecase: UpdateSpecialPopulationUsecase,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  public async create(
    @Body() specialPopulationDto: CreateDto,
  ): Promise<{ data: { type: string; id: string } }> {
    const specialPopulation =
      await this.createSpecialPopulationUsecase.handler(specialPopulationDto);

    if (specialPopulation) {
      return {
        data: {
          type: 'specialPopulation',
          id: `${specialPopulation.id}`,
        },
      };
    }

    if (!specialPopulation) {
      throw new HttpException('User not created', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('list')
  @UseGuards(AuthGuard('jwt'))
  public async listSpecialPopulation(): Promise<SpecialPopulationEntity[]> {
    return await this.getSpecialPopulationListUsecase.handler();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  public async getUserById(
    @Param('id') id: number,
  ): Promise<SpecialPopulationEntity> {
    return await this.getSpecialPopulationUserByIdUsecase.handler(id);
  }

  @Put('update/:id')
  @UseGuards(AuthGuard('jwt'))
  public async update(
    @Param('id') id: number,
    @Body() updateSpecialPopulationDto: UpdateDto,
  ) {
    const updateSpecial = await this.updateSpecialPopulationUsecase.handler(
      id,
      updateSpecialPopulationDto,
    );

    if (!updateSpecial) {
      throw new HttpException(
        `User with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return { data: updateSpecial };
  }
}
