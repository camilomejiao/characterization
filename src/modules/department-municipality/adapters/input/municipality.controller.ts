import { MunicipalityEntity } from '../../../../common/entities/municipality.entity';
import { Repository } from 'typeorm';
import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('municipalities')
export class MunicipalityController {
  constructor(
    @InjectRepository(MunicipalityEntity)
    private readonly municipalityRepository: Repository<MunicipalityEntity>,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'List of municipalities for the given department',
  })
  @ApiResponse({
    status: 404,
    description: 'No municipalities found for the given department',
  })
  @Get(':departmentId')
  async getMunicipalities(@Param('departmentId') departmentId: number) {
    const municipalities = await this.municipalityRepository.find({
      where: { department: { id: departmentId } },
    });

    if (municipalities.length === 0) {
      throw new NotFoundException(
        `No municipalities found for department ID ${departmentId}`,
      );
    }

    return municipalities;
  }
}
